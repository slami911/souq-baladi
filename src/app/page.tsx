"use client";

import { motion } from "framer-motion";
import {
  Zap,
  TrendingUp,
  Clock,
  ShoppingCart,
  Sparkles,
  Dog,
  Users,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import SectionTitle from "@/components/SectionTitle";
import ListingCard from "@/components/ListingCard";
import CitySlider from "@/components/CitySlider";
import StatsCounter from "@/components/StatsCounter";
import { formatPrice } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const mockUser = {
  id: "u1",
  name: "أحمد",
  email: "ahmed@test.com",
  phone: "+966500000000",
  avatar: "https://i.pravatar.cc/150?img=11",
  cover: "",
  bio: "",
  location: "الرياض",
  role: "user" as const,
  verified: true,
  twoFactorEnabled: false,
  createdAt: new Date(),
};

const latestListings = [
  {
    id: "l1",
    title: "آيفون 15 برو ماكس - 256 جيجا",
    description: "هاتف جديد بالعلبة",
    price: 4200,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
    ],
    category: "electronics",
    condition: "new" as const,
    city: "الرياض",
    location: "حي النزهة",
    userId: "u1",
    user: mockUser,
    views: 342,
    likes: 28,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(),
  },
  {
    id: "l2",
    title: "شقة فاخرة 3 غرف نوم - حي الملقا",
    description: "شقة واسعة بإطلالة رائعة",
    price: 3200,
    negotiable: false,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    ],
    category: "real-estate",
    condition: "new" as const,
    city: "الرياض",
    location: "حي الملقا",
    userId: "u2",
    user: { ...mockUser, id: "u2", name: "سارة" },
    views: 567,
    likes: 45,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 7200000),
    updatedAt: new Date(),
  },
  {
    id: "l3",
    title: "تويوتا كامري 2023 - فل أوبشن",
    description: "سيارة بحالة ممتازة",
    price: 95000,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    ],
    category: "cars",
    condition: "like_new" as const,
    city: "جدة",
    location: "حي الروضة",
    userId: "u3",
    user: { ...mockUser, id: "u3", name: "خالد" },
    views: 891,
    likes: 67,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 14400000),
    updatedAt: new Date(),
  },
  {
    id: "l4",
    title: "أريكة مودرن - جلد طبيعي",
    description: "أريكة عريضة بحالة ممتازة",
    price: 2500,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    ],
    category: "furniture",
    condition: "used" as const,
    city: "الدمام",
    location: "حي الفيصلية",
    userId: "u4",
    user: { ...mockUser, id: "u4", name: "فاطمة" },
    views: 234,
    likes: 19,
    isFeatured: false,
    isActive: true,
    createdAt: new Date(Date.now() - 28800000),
    updatedAt: new Date(),
  },
  {
    id: "l5",
    title: "سماعات أبل AirPods Pro 2",
    description: "سماعات جديدة بالضمان",
    price: 850,
    negotiable: false,
    images: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
    ],
    category: "electronics",
    condition: "new" as const,
    city: "مكة",
    location: "حي العزيزية",
    userId: "u5",
    user: { ...mockUser, id: "u5", name: "عمر" },
    views: 178,
    likes: 12,
    isFeatured: false,
    isActive: true,
    createdAt: new Date(Date.now() - 43200000),
    updatedAt: new Date(),
  },
  {
    id: "l6",
    title: "جيتار كلاسيكي - للمبتدئين",
    description: "جيتار بحالة جيدة جداً",
    price: 350,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
    ],
    category: "musical-instruments",
    condition: "used" as const,
    city: "المدينة",
    location: "حي قباء",
    userId: "u6",
    user: { ...mockUser, id: "u6", name: "محمد" },
    views: 89,
    likes: 7,
    isFeatured: false,
    isActive: true,
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
];

const featuredListings = [
  {
    id: "f1",
    title: "فيلا فاخرة مع حديقة - حي الراكة",
    description: "فيلا 5 غرف نوم",
    price: 850000,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    ],
    category: "real-estate",
    condition: "new" as const,
    city: "الخبر",
    location: "حي الراكة",
    userId: "u7",
    user: { ...mockUser, id: "u7", name: "عبدالله" },
    views: 1234,
    likes: 89,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 172800000),
    updatedAt: new Date(),
  },
  {
    id: "f2",
    title: "باص مرسيدس 2020 - نقل سياحي",
    description: "باص رحلات بحالة ممتازة",
    price: 120000,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop",
    ],
    category: "cars",
    condition: "like_new" as const,
    city: "الرياض",
    location: "حي الصفا",
    userId: "u8",
    user: { ...mockUser, id: "u8", name: "ياسر" },
    views: 567,
    likes: 34,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 259200000),
    updatedAt: new Date(),
  },
  {
    id: "f3",
    title: "موتور هوندا سيفيك 2022",
    description: "موتور نظيف جداً",
    price: 8500,
    negotiable: true,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    ],
    category: "motorcycles",
    condition: "like_new" as const,
    city: "أبها",
    location: "حي الأمير سلطان",
    userId: "u9",
    user: { ...mockUser, id: "u9", name: "راشد" },
    views: 345,
    likes: 23,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 345600000),
    updatedAt: new Date(),
  },
  {
    id: "f4",
    title: "لابتوب ماك بوك برو M3",
    description: "لابتوب بحالة كالجديد",
    price: 6500,
    negotiable: false,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    ],
    category: "electronics",
    condition: "like_new" as const,
    city: "الرياض",
    location: "حي العليا",
    userId: "u10",
    user: { ...mockUser, id: "u10", name: "نورة" },
    views: 789,
    likes: 56,
    isFeatured: true,
    isActive: true,
    createdAt: new Date(Date.now() - 432000000),
    updatedAt: new Date(),
  },
];

const topSellers = [
  { id: "s1", name: "أحمد العتيبي", avatar: "https://i.pravatar.cc/150?img=11", listings: 45, rating: 4.8, city: "الرياض" },
  { id: "s2", name: "سارة الحربي", avatar: "https://i.pravatar.cc/150?img=5", listings: 38, rating: 4.9, city: "جدة" },
  { id: "s3", name: "خالد الشمري", avatar: "https://i.pravatar.cc/150?img=12", listings: 32, rating: 4.7, city: "الدمام" },
  { id: "s4", name: "فاطمة الزهراني", avatar: "https://i.pravatar.cc/150?img=9", listings: 28, rating: 4.6, city: "مكة" },
  { id: "s5", name: "محمد القحطاني", avatar: "https://i.pravatar.cc/150?img=15", listings: 25, rating: 4.5, city: "المدينة" },
  { id: "s6", name: "نورة السبيعي", avatar: "https://i.pravatar.cc/150?img=20", listings: 22, rating: 4.4, city: "أبها" },
];

const popularAnimals = [
  { id: "a1", name: "كلب جيرمن شيبرد", breed: "جيرمن شيبرد", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop", price: 5000, location: "الرياض" },
  { id: "a2", name: "قط سايبيرس", breed: "سايبيرس فارسي", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", price: 3000, location: "جدة" },
  { id: "a3", name: "حصان عربي أصيل", breed: "عربي أصيل", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop", price: 50000, location: "الدمام" },
  { id: "a4", name: "ببغاء أفريقى", breed: "ببغاء رمادي", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop", price: 2000, location: "مكة" },
];

const dailyDeals = [
  {
    id: "d1",
    title: "ساعة أبل ووتش Ultra 2",
    originalPrice: 3499,
    salePrice: 2799,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
    discount: 20,
    location: "الرياض",
  },
  {
    id: "d2",
    title: "كيبورد ميكانيكي لوغو",
    originalPrice: 899,
    salePrice: 599,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop",
    discount: 33,
    location: "جدة",
  },
  {
    id: "d3",
    title: "سماعة سوني WH-1000XM5",
    originalPrice: 1499,
    salePrice: 1099,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
    discount: 27,
    location: "الدمام",
  },
];

const suggestedProducts = [
  {
    id: "sp1",
    title: "آيباد برو 12.9 - M2",
    price: 3200,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    location: "الرياض",
  },
  {
    id: "sp2",
    title: "غسالة أوتوماتيك سامسونج",
    price: 2100,
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&h=300&fit=crop",
    location: "جدة",
  },
  {
    id: "sp3",
    title: "شاشة سامسونج 55 بوصة",
    price: 1800,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    location: "الدمام",
  },
  {
    id: "sp4",
    title: "ماكينة قهوة دولتشي غوستو",
    price: 450,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
    location: "مكة",
  },
];

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <CategoryGrid />
        </motion.section>

        {/* Latest Listings */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="أحدث الإعلانات" href="/categories" icon={<Clock className="w-5 h-5" />} />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {latestListings.map((listing) => (
              <motion.div key={listing.id} variants={itemVariants}>
                <ListingCard
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  images={listing.images}
                  location={listing.location}
                  date="منذ ساعتين"
                  views={listing.views}
                  isFeatured={listing.isFeatured}
                  condition={listing.condition === "new" ? "جديد" : listing.condition === "like_new" ? "كالجديد" : "مستعمل"}
                  seller={{ name: listing.user.name, avatar: listing.user.avatar }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Featured Listings */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="إعلانات مميزة" href="/categories" icon={<Zap className="w-5 h-5" />} />
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory">
            {featuredListings.map((listing) => (
              <div key={listing.id} className="flex-shrink-0 w-72 sm:w-80 snap-start">
                <ListingCard
                  id={listing.id}
                  title={listing.title}
                  price={listing.price}
                  images={listing.images}
                  location={listing.location}
                  date="منذ يوم"
                  views={listing.views}
                  isFeatured={true}
                  condition={listing.condition === "new" ? "جديد" : listing.condition === "like_new" ? "كالجديد" : "مستعمل"}
                  seller={{ name: listing.user.name, avatar: listing.user.avatar }}
                />
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <CitySlider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Sellers */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="أكثر البائعين نشاطاً" href="/craftsmen" icon={<Users className="w-5 h-5" />} />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {topSellers.map((seller) => (
              <motion.a
                key={seller.id}
                href={`/profile/${seller.id}`}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow"
              >
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-brand-500"
                />
                <div className="text-center">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate w-full">
                    {seller.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{seller.city}</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-xs text-amber-500">★</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{seller.rating}</span>
                    <span className="text-xs text-gray-400">({seller.listings})</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        {/* Popular Animals */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="الحيوانات الأكثر مشاهدة" href="/animals" icon={<Dog className="w-5 h-5" />} />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {popularAnimals.map((animal) => (
              <motion.div key={animal.id} variants={itemVariants}>
                <a href={`/listing/${animal.id}`}>
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{animal.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{animal.location}</p>
                      <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                        {formatPrice(animal.price)}
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Daily Deals */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="عروض اليوم" href="/categories" icon={<ShoppingCart className="w-5 h-5" />} />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {dailyDeals.map((deal) => (
              <motion.div key={deal.id} variants={itemVariants}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-lg">
                      -{deal.discount}%
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{deal.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-red-500">{formatPrice(deal.salePrice)}</span>
                      <span className="text-sm text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{deal.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Suggested Products */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-16"
        >
          <SectionTitle title="منتجات مقترحة لك" href="/categories" icon={<Sparkles className="w-5 h-5" />} />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {suggestedProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <a href={`/listing/${product.id}`}>
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-shadow">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">{product.title}</h4>
                      <span className="text-base font-bold text-brand-600 dark:text-brand-400">
                        {formatPrice(product.price)}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.location}</p>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
