import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDate(date: Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSeconds < 60) {
    return 'الآن';
  } else if (diffMinutes < 60) {
    return diffMinutes === 1 ? 'منذ دقيقة' : `منذ ${diffMinutes} دقائق`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? 'منذ ساعة' : `منذ ${diffHours} ساعات`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? 'منذ يوم' : `منذ ${diffDays} أيام`;
  } else if (diffWeeks < 4) {
    return diffWeeks === 1 ? 'منذ أسبوع' : `منذ ${diffWeeks} أسابيع`;
  } else if (diffMonths < 12) {
    return diffMonths === 1 ? 'منذ شهر' : `منذ ${diffMonths} أشهر`;
  } else {
    return diffYears === 1 ? 'منذ سنة' : `منذ ${diffYears} سنوات`;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:3001/uploads';

export function getImageUrl(path: string): string {
  if (!path) return '/images/placeholder.png';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.replace(/^\/+/, '');
  return `${IMAGE_BASE_URL}/${cleanPath}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
}
