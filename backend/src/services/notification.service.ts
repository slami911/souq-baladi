import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateNotificationParams {
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string;
}

export const createNotification = async (params: CreateNotificationParams): Promise<void> => {
  try {
    await prisma.notification.create({
      data: {
        userId: params.userId,
        type: params.type,
        title: params.title,
        message: params.message,
        link: params.link,
      },
    });
  } catch (error) {
    console.error('Create notification error:', error);
  }
};

export const createListingNotification = async (
  listingId: string,
  listingTitle: string,
  sellerId: string,
  buyerId: string,
  buyerName: string
): Promise<void> => {
  await createNotification({
    userId: sellerId,
    type: 'NEW_MESSAGE',
    title: 'New inquiry about your listing',
    message: `${buyerName} is interested in "${listingTitle}"`,
    link: `/listings/${listingId}`,
  });
};

export const createFavoriteNotification = async (
  listingId: string,
  listingTitle: string,
  sellerId: string,
  favoriterName: string
): Promise<void> => {
  await createNotification({
    userId: sellerId,
    type: 'FAVORITE',
    title: 'Your listing was favorited',
    message: `${favoriterName} added "${listingTitle}" to their favorites`,
    link: `/listings/${listingId}`,
  });
};

export const createReviewNotification = async (
  craftsmanId: string,
  craftsmanUserId: string,
  reviewerName: string,
  rating: number
): Promise<void> => {
  await createNotification({
    userId: craftsmanUserId,
    type: 'REVIEW',
    title: 'New review received',
    message: `${reviewerName} left you a ${rating}-star review`,
    link: `/craftsmen/${craftsmanId}`,
  });
};

export const createSubscriptionNotification = async (
  userId: string,
  plan: string
): Promise<void> => {
  await createNotification({
    userId,
    type: 'SUBSCRIPTION',
    title: 'Subscription updated',
    message: `Your subscription has been updated to ${plan} plan`,
    link: '/settings/subscription',
  });
};

export const createReportResolvedNotification = async (
  userId: string,
  reportId: string,
  status: string
): Promise<void> => {
  await createNotification({
    userId,
    type: 'REPORT',
    title: 'Report update',
    message: `Your report has been ${status.toLowerCase()}`,
    link: `/reports/${reportId}`,
  });
};
