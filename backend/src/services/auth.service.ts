import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token: googleToken } = req.body;

    const googleResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${googleToken}`
    );

    if (!googleResponse.ok) {
      res.status(401).json({ error: 'Invalid Google token' });
      return;
    }

    const googleData = await googleResponse.json() as {
      sub: string;
      email: string;
      name: string;
      picture?: string;
    };

    let user = await prisma.user.findFirst({
      where: { googleId: googleData.sub },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: googleData.email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleData.sub,
            avatar: user.avatar || googleData.picture,
            verified: true,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: googleData.email,
            name: googleData.name,
            googleId: googleData.sub,
            avatar: googleData.picture,
            verified: true,
          },
        });
      }
    }

    const authToken = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token: authToken,
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
};

export const facebookAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accessToken } = req.body;

    const fbResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,email,name,picture&access_token=${accessToken}`
    );

    if (!fbResponse.ok) {
      res.status(401).json({ error: 'Invalid Facebook token' });
      return;
    }

    const fbData = await fbResponse.json() as {
      id: string;
      email: string;
      name: string;
      picture?: { data: { url: string } };
    };

    let user = await prisma.user.findFirst({
      where: { facebookId: fbData.id },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: fbData.email },
      });

      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            facebookId: fbData.id,
            avatar: user.avatar || fbData.picture?.data.url,
            verified: true,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            email: fbData.email,
            name: fbData.name,
            facebookId: fbData.id,
            avatar: fbData.picture?.data.url,
            verified: true,
          },
        });
      }
    }

    const authToken = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      token: authToken,
    });
  } catch (error) {
    console.error('Facebook auth error:', error);
    res.status(500).json({ error: 'Facebook authentication failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.json({ message: 'If the email exists, a reset link has been sent' });
      return;
    }

    const resetToken = jwt.sign({ userId: user.id }, config.jwtSecret, {
      expiresIn: '1h',
    });

    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({ message: 'If the email exists, a reset link has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ error: 'Reset token expired' });
      return;
    }
    res.status(500).json({ error: 'Password reset failed' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        cover: true,
        bio: true,
        location: true,
        role: true,
        verified: true,
        createdAt: true,
        _count: {
          select: { listings: true, favorites: true },
        },
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const data = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        avatar: true,
        cover: true,
        bio: true,
        location: true,
        role: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user || !user.password) {
      res.status(400).json({ error: 'Current password is required' });
      return;
    }

    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      res.status(400).json({ error: 'Current password is incorrect' });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
};
