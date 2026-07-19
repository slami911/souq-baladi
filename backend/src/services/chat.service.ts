import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getConversations = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const participants = await prisma.conversationParticipant.findMany({
      where: { userId },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: { select: { id: true, name: true, avatar: true } },
              },
            },
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1,
              include: {
                sender: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { conversation: { updatedAt: 'desc' } },
    });

    const conversations = participants.map((p) => ({
      ...p.conversation,
      otherUser: p.conversation.participants
        .filter((part) => part.userId !== userId)
        .map((part) => part.user)[0],
      lastMessage: p.conversation.messages[0] || null,
      unreadCount: 0,
    }));

    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};

export const getConversationMessages = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '50' } = req.query;
    const userId = req.user!.id;

    const participant = await prisma.conversationParticipant.findUnique({
      where: {
        conversationId_userId: { conversationId: id, userId },
      },
    });

    if (!participant) {
      res.status(403).json({ error: 'Not authorized to view this conversation' });
      return;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { conversationId: id, isDeleted: false },
        include: {
          sender: { select: { id: true, name: true, avatar: true } },
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.message.count({
        where: { conversationId: id, isDeleted: false },
      }),
    ]);

    await prisma.message.updateMany({
      where: {
        conversationId: id,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    res.json({
      data: messages.reverse(),
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const createOrGetConversation = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { participantId } = req.body;

    if (userId === participantId) {
      res.status(400).json({ error: 'Cannot create conversation with yourself' });
      return;
    }

    const existingParticipant = await prisma.conversationParticipant.findFirst({
      where: {
        userId,
        conversation: {
          participants: {
            some: { userId: participantId },
          },
        },
      },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: { select: { id: true, name: true, avatar: true } },
              },
            },
          },
        },
      },
    });

    if (existingParticipant) {
      res.json(existingParticipant.conversation);
      return;
    }

    const conversation = await prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId },
            { userId: participantId },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string,
  type: string = 'TEXT',
  fileUrl?: string
) => {
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: { conversationId, userId: senderId },
    },
  });

  if (!participant) {
    throw new Error('Not authorized to send messages in this conversation');
  }

  const message = await prisma.message.create({
    data: {
      conversationId,
      senderId,
      content,
      type: type as any,
      fileUrl,
    },
    include: {
      sender: { select: { id: true, name: true, avatar: true } },
    },
  });

  await prisma.conversation.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  return message;
};
