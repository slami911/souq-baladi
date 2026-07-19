import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { authenticate, optionalAuth } from '../middleware/auth';
import { uploadMultiple, handleUpload } from '../middleware/upload';
import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  likeListing,
  getFeaturedListings,
  getNearbyListings,
} from '../services/listing.service';

const router = Router();

const createListingSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(10).max(5000),
    price: z.number().min(0),
    negotiable: z.boolean().optional(),
    condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']).optional(),
    city: z.string().min(1),
    location: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    categoryId: z.string().uuid(),
    subcategoryId: z.string().uuid().optional(),
    expiresAt: z.string().datetime().optional(),
  }),
});

const updateListingSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200).optional(),
    description: z.string().min(10).max(5000).optional(),
    price: z.number().min(0).optional(),
    negotiable: z.boolean().optional(),
    condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR']).optional(),
    city: z.string().min(1).optional(),
    location: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    categoryId: z.string().uuid().optional(),
    subcategoryId: z.string().uuid().optional(),
    isActive: z.boolean().optional(),
    expiresAt: z.string().datetime().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

router.get('/', optionalAuth, getListings);
router.get('/featured', getFeaturedListings);
router.get('/nearby', getNearbyListings);
router.get('/:id', optionalAuth, getListingById);
router.post('/', authenticate, uploadMultiple('images', 10), handleUpload, validate(createListingSchema), createListing);
router.put('/:id', authenticate, validate(updateListingSchema), updateListing);
router.delete('/:id', authenticate, deleteListing);
router.post('/:id/like', authenticate, likeListing);

export default router;
