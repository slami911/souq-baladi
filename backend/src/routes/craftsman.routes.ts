import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, optionalAuth } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const createProfileSchema = z.object({
  body: z.object({
    profession: z.string().min(2).max(100),
    professionAr: z.string().min(2).max(100),
    yearsOfExperience: z.number().int().min(0).optional(),
    priceRange: z.string().optional(),
    available: z.boolean().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    bio: z.string().max(1000).optional(),
  }),
});

const updateProfileSchema = z.object({
  body: z.object({
    profession: z.string().min(2).max(100).optional(),
    professionAr: z.string().min(2).max(100).optional(),
    yearsOfExperience: z.number().int().min(0).optional(),
    priceRange: z.string().optional(),
    available: z.boolean().optional(),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    bio: z.string().max(1000).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const createReviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(1000).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const addGallerySchema = z.object({
  body: z.object({
    imageUrl: z.string().url(),
    caption: z.string().max(200).optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const addServiceSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    nameAr: z.string().min(1).max(100),
    price: z.number().min(0),
    description: z.string().max(500).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

router.get('/', async (req, res) => {
  try {
    const { profession, search, page = '1', limit = '20' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = { available: true };
    if (profession) {
      where.profession = { contains: profession as string, mode: 'insensitive' };
    }
    if (search) {
      where.OR = [
        { profession: { contains: search as string, mode: 'insensitive' } },
        { user: { name: { contains: search as string, mode: 'insensitive' } } },
      ];
    }

    const [craftsmen, total] = await Promise.all([
      prisma.craftsmanProfile.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true, location: true } },
          ratings: { select: { rating: true } },
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { yearsOfExperience: 'desc' },
      }),
      prisma.craftsmanProfile.count({ where }),
    ]);

    const craftsmenWithRating = craftsmen.map((c) => ({
      ...c,
      averageRating:
        c.ratings.length > 0
          ? c.ratings.reduce((sum, r) => sum + r.rating, 0) / c.ratings.length
          : 0,
      totalReviews: c.ratings.length,
    }));

    res.json({
      data: craftsmenWithRating,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch craftsmen' });
  }
});

router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const craftsman = await prisma.craftsmanProfile.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, cover: true, location: true } },
        gallery: { orderBy: { order: 'asc' } },
        services: true,
        ratings: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!craftsman) {
      res.status(404).json({ error: 'Craftsman not found' });
      return;
    }

    const averageRating =
      craftsman.ratings.length > 0
        ? craftsman.ratings.reduce((sum, r) => sum + r.rating, 0) / craftsman.ratings.length
        : 0;

    res.json({
      ...craftsman,
      averageRating,
      totalReviews: craftsman.ratings.length,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch craftsman' });
  }
});

router.post('/', authenticate, validate(createProfileSchema), async (req, res) => {
  try {
    const userId = req.user!.id;

    const existing = await prisma.craftsmanProfile.findUnique({ where: { userId } });
    if (existing) {
      res.status(400).json({ error: 'Craftsman profile already exists' });
      return;
    }

    const profile = await prisma.craftsmanProfile.create({
      data: { userId, ...req.body },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { role: 'CRAFTSMAN' },
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create craftsman profile' });
  }
});

router.put('/:id', authenticate, validate(updateProfileSchema), async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.craftsmanProfile.findUnique({ where: { id } });
    if (!profile) {
      res.status(404).json({ error: 'Craftsman profile not found' });
      return;
    }

    if (profile.userId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const updated = await prisma.craftsmanProfile.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update craftsman profile' });
  }
});

router.get('/:id/gallery', async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await prisma.craftsmanGallery.findMany({
      where: { craftsmanId: id },
      orderBy: { order: 'asc' },
    });

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

router.post('/:id/gallery', authenticate, validate(addGallerySchema), async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.craftsmanProfile.findUnique({ where: { id } });
    if (!profile || profile.userId !== req.user!.id) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const item = await prisma.craftsmanGallery.create({
      data: { craftsmanId: id, ...req.body },
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gallery item' });
  }
});

router.post('/:id/services', authenticate, validate(addServiceSchema), async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await prisma.craftsmanProfile.findUnique({ where: { id } });
    if (!profile || profile.userId !== req.user!.id) {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const service = await prisma.craftsmanService.create({
      data: { craftsmanId: id, ...req.body },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add service' });
  }
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = '1', limit = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [reviews, total] = await Promise.all([
      prisma.rating.findMany({
        where: { craftsmanId: id },
        include: { user: { select: { id: true, name: true, avatar: true } } },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.rating.count({ where: { craftsmanId: id } }),
    ]);

    res.json({
      data: reviews,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

router.post('/:id/reviews', authenticate, validate(createReviewSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { rating, comment } = req.body;

    if (userId === id) {
      res.status(400).json({ error: 'Cannot review yourself' });
      return;
    }

    const profile = await prisma.craftsmanProfile.findUnique({ where: { id } });
    if (!profile) {
      res.status(404).json({ error: 'Craftsman not found' });
      return;
    }

    const existingReview = await prisma.rating.findFirst({
      where: { userId, craftsmanId: id },
    });

    if (existingReview) {
      res.status(400).json({ error: 'You have already reviewed this craftsman' });
      return;
    }

    const review = await prisma.rating.create({
      data: { userId, craftsmanId: id, rating, comment },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
