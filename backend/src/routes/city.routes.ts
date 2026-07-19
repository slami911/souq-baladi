import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const createCitySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    nameAr: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    imageUrl: z.string().url().optional(),
  }),
});

const updateCitySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    nameAr: z.string().min(1).max(100).optional(),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
    imageUrl: z.string().url().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

router.get('/', async (req, res) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const city = await prisma.city.findUnique({ where: { id } });

    if (!city) {
      res.status(404).json({ error: 'City not found' });
      return;
    }

    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city' });
  }
});

router.post('/', authenticate, authorize(Role.ADMIN), validate(createCitySchema), async (req, res) => {
  try {
    const { name, nameAr, slug, imageUrl } = req.body;

    const existing = await prisma.city.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ error: 'City with this slug already exists' });
      return;
    }

    const city = await prisma.city.create({
      data: { name, nameAr, slug, imageUrl },
    });

    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create city' });
  }
});

router.put('/:id', authenticate, authorize(Role.ADMIN), validate(updateCitySchema), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.slug) {
      const existing = await prisma.city.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (existing) {
        res.status(400).json({ error: 'City with this slug already exists' });
        return;
      }
    }

    const city = await prisma.city.update({
      where: { id },
      data,
    });

    res.json(city);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update city' });
  }
});

router.delete('/:id', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.city.delete({ where: { id } });
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router;
