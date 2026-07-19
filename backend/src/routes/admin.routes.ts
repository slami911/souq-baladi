import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import { Role, ReportStatus } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

router.use(authenticate, authorize(Role.ADMIN));

router.get('/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalListings,
      totalCraftsmen,
      totalCategories,
      activeListings,
      pendingReports,
      newUsersThisMonth,
      newListingsThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.listing.count(),
      prisma.craftsmanProfile.count(),
      prisma.category.count(),
      prisma.listing.count({ where: { isActive: true } }),
      prisma.report.count({ where: { status: 'PENDING' } }),
      prisma.user.count({
        where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
      }),
      prisma.listing.count({
        where: { createdAt: { gte: new Date(new Date().setDate(1)) } },
      }),
    ]);

    res.json({
      totalUsers,
      totalListings,
      totalCraftsmen,
      totalCategories,
      activeListings,
      pendingReports,
      newUsersThisMonth,
      newListingsThisMonth,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const { page = '1', limit = '20', search, role } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (role) {
      where.role = role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          verified: true,
          createdAt: true,
          _count: { select: { listings: true } },
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      data: users,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!Object.values(Role).includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

router.put('/users/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.update({
      where: { id },
      data: { verified: true },
      select: { id: true, name: true, email: true, verified: true },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify user' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.get('/listings', async (req, res) => {
  try {
    const { page = '1', limit = '20', search, isActive, categoryId } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    if (isActive !== undefined) {
      where.isActive = isActive === 'true';
    }
    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
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
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

router.put('/listings/:id/feature', async (req, res) => {
  try {
    const { id } = req.params;
    const { isFeatured } = req.body;

    const listing = await prisma.listing.update({
      where: { id },
      data: { isFeatured },
    });

    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
});

router.put('/listings/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({ where: { id } });
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { isActive: !listing.isActive },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle listing' });
  }
});

router.delete('/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.listing.delete({ where: { id } });
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

router.get('/reports', async (req, res) => {
  try {
    const { page = '1', limit = '20', status } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          reporter: { select: { id: true, name: true, email: true } },
          listing: { select: { id: true, title: true } },
          user: { select: { id: true, name: true, email: true } },
        },
        skip,
        take: parseInt(limit as string),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.report.count({ where }),
    ]);

    res.json({
      data: reports,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

router.put('/reports/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!Object.values(ReportStatus).includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }

    const report = await prisma.report.update({
      where: { id },
      data: { status },
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update report' });
  }
});

router.get('/subscriptions', async (req, res) => {
  try {
    const { page = '1', limit = '20', plan } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (plan) {
      where.plan = plan;
    }

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        include: { user: { select: { id: true, name: true, email: true } } },
        skip,
        take: parseInt(limit as string),
        orderBy: { startDate: 'desc' },
      }),
      prisma.subscription.count({ where }),
    ]);

    res.json({
      data: subscriptions,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

export default router;
