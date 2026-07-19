import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import { Role } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    nameAr: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    icon: z.string().optional(),
    color: z.string().optional(),
    order: z.number().int().optional(),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    nameAr: z.string().min(1).max(100).optional(),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/).optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    order: z.number().int().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

const createSubcategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    nameAr: z.string().min(1).max(100),
    slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
    categoryId: z.string().uuid(),
  }),
});

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { subcategories: true },
      orderBy: { order: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
      include: { subcategories: true },
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

router.post('/', authenticate, authorize(Role.ADMIN), validate(createCategorySchema), async (req, res) => {
  try {
    const { name, nameAr, slug, icon, color, order } = req.body;

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ error: 'Category with this slug already exists' });
      return;
    }

    const category = await prisma.category.create({
      data: { name, nameAr, slug, icon, color, order },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

router.put('/:id', authenticate, authorize(Role.ADMIN), validate(updateCategorySchema), async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.slug) {
      const existing = await prisma.category.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (existing) {
        res.status(400).json({ error: 'Category with this slug already exists' });
        return;
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data,
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', authenticate, authorize(Role.ADMIN), async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id } });
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

router.post('/subcategories', authenticate, authorize(Role.ADMIN), validate(createSubcategorySchema), async (req, res) => {
  try {
    const { name, nameAr, slug, categoryId } = req.body;

    const existing = await prisma.subcategory.findUnique({ where: { slug } });
    if (existing) {
      res.status(400).json({ error: 'Subcategory with this slug already exists' });
      return;
    }

    const subcategory = await prisma.subcategory.create({
      data: { name, nameAr, slug, categoryId },
    });

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subcategory' });
  }
});

export default router;
