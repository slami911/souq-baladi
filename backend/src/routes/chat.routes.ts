import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';
import {
  getConversations,
  getConversationMessages,
  createOrGetConversation,
} from '../services/chat.service';

const router = Router();

const createConversationSchema = z.object({
  body: z.object({
    participantId: z.string().uuid(),
  }),
});

const getMessagesSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

router.get('/conversations', authenticate, getConversations);
router.post('/conversations', authenticate, validate(createConversationSchema), createOrGetConversation);
router.get('/conversations/:id/messages', authenticate, validate(getMessagesSchema), getConversationMessages);

export default router;
