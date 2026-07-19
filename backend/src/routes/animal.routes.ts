import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, optionalAuth } from '../middleware/auth';
import { uploadMultiple, handleUpload } from '../middleware/upload';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

const createAnimalListingSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(10).max(5000),
    price: z.number().min(0),
    negotiable: z.boolean().optional(),
    city: z.string().min(1),
    location: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    animalType: z.string().min(1),
    breed: z.string().optional(),
    age: z.number().int().min(0).optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional(),
    healthStatus: z.string().optional(),
    vaccinated: z.boolean().optional(),
    vaccinatedDetails: z.string().optional(),
  }),
});

router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      animalType,
      breed,
      gender,
      vaccinated,
      city,
      minPrice,
      maxPrice,
      search,
      page = '1',
      limit = '20',
    } = req.query;

    const where: any = {
      isActive: true,
      animal: { isNot: null },
    };

    if (animalType) {
      where.animal.animalType = { contains: animalType as string, mode: 'insensitive' };
    }
    if (breed) {
      where.animal.breed = { contains: breed as string, mode: 'insensitive' };
    }
    if (gender) {
      where.animal.gender = gender;
    }
    if (vaccinated !== undefined) {
      where.animal.vaccinated = vaccinated === 'true';
    }
    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }
    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice as string) };
    }
    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice as string) };
    }
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          animal: true,
          user: { select: { id: true, name: true, avatar: true } },
          category: true,
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.listing.count({ where }),
    ]);

    res.json({
      data: listings,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch animal listings' });
  }
});

router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        animal: true,
        user: { select: { id: true, name: true, avatar: true, phone: true } },
        category: true,
        subcategory: true,
      },
    });

    if (!listing || !listing.animal) {
      res.status(404).json({ error: 'Animal listing not found' });
      return;
    }

    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch animal listing' });
  }
});

router.post('/', authenticate, uploadMultiple('images', 10), handleUpload, validate(createAnimalListingSchema), async (req, res) => {
  try {
    const userId = req.user!.id;
    const {
      title, description, price, negotiable, city, location,
      latitude, longitude, animalType, breed, age, gender,
      healthStatus, vaccinated, vaccinatedDetails,
    } = req.body;

    const uploadedFiles = (req as any).uploadedFiles || [];

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        negotiable: negotiable || false,
        city,
        location,
        latitude,
        longitude,
        images: uploadedFiles.map((f: any) => f.url),
        userId,
        categoryId: '00000000-0000-0000-0000-000000000000',
        animal: {
          create: {
            animalType,
            breed,
            age,
            gender,
            healthStatus,
            vaccinated: vaccinated || false,
            vaccinatedDetails,
          },
        },
      },
      include: { animal: true },
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create animal listing' });
  }
});

router.get('/types/list', async (req, res) => {
  try {
    const types = await prisma.animalListing.findMany({
      select: { animalType: true },
      distinct: ['animalType'],
      orderBy: { animalType: 'asc' },
    });

    res.json(types.map((t) => t.animalType));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch animal types' });
  }
});

router.get('/breeds/list', async (req, res) => {
  try {
    const { animalType } = req.query;

    const where: any = {};
    if (animalType) {
      where.animalType = animalType as string;
    }

    const breeds = await prisma.animalListing.findMany({
      where,
      select: { breed: true },
      distinct: ['breed'],
      orderBy: { breed: 'asc' },
    });

    res.json(breeds.map((b) => b.breed).filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch breeds' });
  }
});

export default router;
