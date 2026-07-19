"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  Eye,
  Star,
  Phone,
  MessageCircle,
  ChevronLeft,
  Shield,
  Flag,
  Bookmark,
  Send,
} from "lucide-react";
import ImageGallery from "@/components/ImageGallery";
import ListingCard from "@/components/ListingCard";
import { formatPrice, formatDate } from "@/lib/utils";

const mockUser = {
  id: "u1",
  name: "أحمد العتيبي",
  email: "ahmed@test.com",
  phone: "+966500000000",
  avatar: "https://i.pravatar.cc/150?img=11",
  cover: "",
  bio: "بائع موثوق - خبرة 5 سنوات في بيع الإلكترونيات",
  location: "الرياض",
  role: "user" as const,
  verified: true,
  twoFactorEnabled: false,
  createdAt: new Date("2023-01-15"),
};

const listing = {
  id: "l1",
  title: "آيفون 15 برو ماكس - 256 جيجا - اللون الأزرق تيتانيوم",
  description:
    "أبيع آيفون 15 برو ماكس بسعة 256 جيجا باللون الأزرق التيتانيوم. الجهاز جديد بالعلبة لم يُستخدم مع جميع الملحقات الأصلية (شاحن، كابل، دليل المستخدم). الجهاز بحالة ممتازة ومضمون من أبل لمدة سنة. السعر قابل للتفاوض للجادين فقط.",
  price: 4200,
  negotiable: true,
  images: [
    "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=600&fit=crop",
  ],
  category: "إلكترونيات",
  subcategory: "هواتف",
  condition: "جديد",
  city: "الرياض",
  location: "حي النزهة، شارع الأمير سلطان",
  views: 342,
  likes: 28,
  isFeatured: true,
  createdAt: new Date(Date.now() - 7200000),
  user: mockUser,
};

const similarListings = [
  {
    id: "s1",
    title: "آيفون 14 برو - 128 جيجا",
    price: 3200,
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"],
    location: "جدة",
    date: "منذ يوم",
    views: 234,
    seller: { name: "خالد", avatar: "https://i.pravatar.cc/150?img=12" },
  },
  {
    id: "s2",
    title: "سامسونج Galaxy S24 Ultra",
    price: 3800,
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop"],
    location: "الرياض",
    date: "منذ 3 ساعات",
    views: 189,
    seller: { name: "سارة", avatar: "https://i.pravatar.cc/150?img=5" },
  },
  {
    id: "s3",
    title: "هواوي P60 Pro",
    price: 2800,
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=300&fit=crop"],
    location: "الدمام",
    date: "منذ 5 ساعات",
    views: 156,
    seller: { name: "محمد", avatar: "https://i.pravatar.cc/150?img=15" },
  },
];

export default function ListingDetailPage() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          إلكترونيات
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الإعلان</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ImageGallery images={listing.images} alt={listing.title} />
          </motion.div>

          {/* Title & Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-relaxed">
                {listing.title}
              </h1>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
                </button>
                <button className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                {formatPrice(listing.price)}
              </span>
              {listing.negotiable && (
                <span className="px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium rounded-lg">
                  قابل للتفاوض
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {listing.city} - {listing.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDate(listing.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {listing.views} مشاهدة
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                {listing.likes} إعجاب
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm rounded-lg font-medium">
                {listing.condition}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                {listing.category}
              </span>
              <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-lg">
                {listing.subcategory}
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">الوصف</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">خريطة الموقع</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">{listing.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Similar Listings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">إعلانات مشابهة</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarListings.map((item) => (
                <ListingCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  images={item.images}
                  location={item.location}
                  date={item.date}
                  views={item.views}
                  seller={item.seller}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Seller Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 sticky top-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={listing.user.avatar}
                alt={listing.user.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{listing.user.name}</h3>
                  {listing.user.verified && (
                    <Shield className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{listing.user.location}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.8</span>
                  <span className="text-xs text-gray-400">(124 تقييم)</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{listing.user.bio}</p>

            <div className="text-xs text-gray-400 mb-4">
              عضو منذ {listing.user.createdAt.getFullYear()}
            </div>

            <div className="space-y-3">
              <a
                href={`tel:${listing.user.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors"
              >
                <Phone className="w-5 h-5" />
                اتصال مباشر
              </a>
              <Link
                href={`/chat?user=${listing.user.id}`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                محادثة
              </Link>
              <a
                href={`https://wa.me/${listing.user.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
                واتساب
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="flex items-center gap-2 w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                <Flag className="w-4 h-4" />
                الإبلاغ عن الإعلان
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
