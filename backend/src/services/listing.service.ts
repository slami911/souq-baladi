import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      search,
      categoryId,
      subcategoryId,
      city,
      minPrice,
      maxPrice,
      condition,
      sortBy = 'createdAt',
      order = 'desc',
      page = '1',
      limit = '20',
    } = req.query;

    const where: any = { isActive: true };

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    if (subcategoryId) {
      where.subcategoryId = subcategoryId as string;
    }

    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    if (condition) {
      where.condition = condition;
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const orderBy: any = {};
    if (sortBy === 'price') {
      orderBy.price = order;
    } else if (sortBy === 'views') {
      orderBy.views = order;
    } else if (sortBy === 'likes') {
      orderBy.likes = order;
    } else {
      orderBy.createdAt = order;
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true, nameAr: true, slug: true } },
          subcategory: { select: { id: true, name: true, nameAr: true, slug: true } },
          _count: { select: { favorites: true } },
        },
        skip,
        take: parseInt(limit as string),
        orderBy,
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
    console.error('Get listings error:', error);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
};

export const getListingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatar: true, phone: true, location: true } },
        category: true,
        subcategory: true,
        _count: { select: { favorites: true } },
      },
    });

    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    let isFavorited = false;
    if ((req as AuthRequest).user) {
      const favorite = await prisma.favorite.findUnique({
        where: {
          userId_listingId: {
            userId: (req as AuthRequest).user!.id,
            listingId: id,
          },
        },
      });
      isFavorited = !!favorite;
    }

    res.json({ ...listing, isFavorited, views: listing.views + 1 });
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
};

export const createListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const {
      title, description, price, negotiable, condition, city,
      location, latitude, longitude, categoryId, subcategoryId, expiresAt,
    } = req.body;

    const uploadedFiles = (req as any).uploadedFiles || [];

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        negotiable: negotiable || false,
        condition: condition || 'GOOD',
        city,
        location,
        latitude,
        longitude,
        images: uploadedFiles.map((f: any) => f.url),
        categoryId,
        subcategoryId,
        userId,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: true,
      },
    });

    res.status(201).json(listing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ error: 'Failed to create listing' });
  }
};

export const updateListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const existing = await prisma.listing.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    if (existing.userId !== userId && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    const data = req.body;
    if (data.expiresAt) {
      data.expiresAt = new Date(data.expiresAt);
    }

    const listing = await prisma.listing.update({
      where: { id },
      data,
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: true,
      },
    });

    res.json(listing);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ error: 'Failed to update listing' });
  }
};

export const deleteListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const existing = await prisma.listing.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    if (existing.userId !== userId && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Not authorized' });
      return;
    }

    await prisma.listing.delete({ where: { id } });

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ error: 'Failed to delete listing' });
  }
};

export const likeListing = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const existing = await prisma.favorite.findUnique({
      where: { userId_listingId: { userId, listingId: id } },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { userId_listingId: { userId, listingId: id } },
      });

      await prisma.listing.update({
        where: { id },
        data: { likes: { decrement: 1 } },
      });

      res.json({ liked: false });
    } else {
      await prisma.favorite.create({
        data: { userId, listingId: id },
      });

      await prisma.listing.update({
        where: { id },
        data: { likes: { increment: 1 } },
      });

      res.json({ liked: true });
    }
  } catch (error) {
    console.error('Like listing error:', error);
    res.status(500).json({ error: 'Failed to like listing' });
  }
};

export const getFeaturedListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = '10' } = req.query;

    const listings = await prisma.listing.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        expiresAt: { gt: new Date() },
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, nameAr: true, slug: true } },
      },
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    res.json(listings);
  } catch (error) {
    console.error('Get featured listings error:', error);
    res.status(500).json({ error: 'Failed to fetch featured listings' });
  }
};

export const getNearbyListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const { latitude, longitude, radius = '10', limit = '20' } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }

    const lat = parseFloat(latitude as string);
    const lng = parseFloat(longitude as string);
    const rad = parseFloat(radius as string);

    const latDelta = rad / 111;
    const lngDelta = rad / (111 * Math.cos((lat * Math.PI) / 180));

    const listings = await prisma.listing.findMany({
      where: {
        isActive: true,
        latitude: { gte: lat - latDelta, lte: lat + latDelta },
        longitude: { gte: lng - lngDelta, lte: lng + lngDelta },
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        category: { select: { id: true, name: true, nameAr: true, slug: true } },
      },
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    res.json(listings);
  } catch (error) {
    console.error('Get nearby listings error:', error);
    res.status(500).json({ error: 'Failed to fetch nearby listings' });
  }
};
