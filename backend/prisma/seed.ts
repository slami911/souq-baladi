import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = await bcrypt.hash('admin123', 12);
  const userPassword = await bcrypt.hash('user123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@souq-baladi.com' },
    update: {},
    create: {
      email: 'admin@souq-baladi.com',
      password: adminPassword,
      name: 'Admin',
      role: Role.ADMIN,
      verified: true,
    },
  });

  const categories = [
    { name: 'Electronics', nameAr: 'إلكترونيات', slug: 'electronics', icon: 'smartphone', color: '#3B82F6', order: 1 },
    { name: 'Vehicles', nameAr: 'سيارات', slug: 'vehicles', icon: 'car', color: '#10B981', order: 2 },
    { name: 'Real Estate', nameAr: 'عقارات', slug: 'real-estate', icon: 'home', color: '#F59E0B', order: 3 },
    { name: 'Furniture', nameAr: 'أثاث', slug: 'furniture', icon: 'sofa', color: '#8B5CF6', order: 4 },
    { name: 'Animals', nameAr: 'حيوانات', slug: 'animals', icon: 'paw', color: '#EC4899', order: 5 },
    { name: 'Fashion', nameAr: 'أزياء', slug: 'fashion', icon: 'shirt', color: '#F97316', order: 6 },
    { name: 'Jobs', nameAr: 'وظائف', slug: 'jobs', icon: 'briefcase', color: '#6366F1', order: 7 },
    { name: 'Services', nameAr: 'خدمات', slug: 'services', icon: 'tools', color: '#14B8A6', order: 8 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const cities = [
    { name: 'Algiers', nameAr: 'الجزائر', slug: 'algiers', imageUrl: '/images/cities/algiers.jpg' },
    { name: 'Oran', nameAr: 'وهران', slug: 'oran', imageUrl: '/images/cities/oran.jpg' },
    { name: 'Constantine', nameAr: 'قسنطينة', slug: 'constantine', imageUrl: '/images/cities/constantine.jpg' },
    { name: 'Annaba', nameAr: 'عنابة', slug: 'annaba', imageUrl: '/images/cities/annaba.jpg' },
    { name: 'Blida', nameAr: 'البليدة', slug: 'blida', imageUrl: '/images/cities/blida.jpg' },
    { name: 'Setif', nameAr: 'سطيف', slug: 'setif', imageUrl: '/images/cities/setif.jpg' },
    { name: 'Batna', nameAr: 'باتنة', slug: 'batna', imageUrl: '/images/cities/batna.jpg' },
    { name: 'Tlemcen', nameAr: 'تلمسان', slug: 'tlemcen', imageUrl: '/images/cities/tlemcen.jpg' },
  ];

  for (const city of cities) {
    await prisma.city.upsert({
      where: { slug: city.slug },
      update: {},
      create: city,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
