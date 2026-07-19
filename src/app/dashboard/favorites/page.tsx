"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ListingCard from "@/components/ListingCard";

const favoriteListings = [
  { id: "f1", title: "شقة فاخرة 3 غرف نوم", price: 3200, images: ["https://picsum.photos/seed/fav1/400/300"], location: "الرياض", date: "منذ يوم", views: 567, seller: { name: "سارة", avatar: "https://i.pravatar.cc/150?img=5" } },
  { id: "f2", title: "تويوتا كامري 2023", price: 95000, images: ["https://picsum.photos/seed/fav2/400/300"], location: "جدة", date: "منذ 3 أيام", views: 891, seller: { name: "خالد", avatar: "https://i.pravatar.cc/150?img=12" } },
  { id: "f3", title: "فيلا مع حديقة", price: 850000, images: ["https://picsum.photos/seed/fav3/400/300"], location: "الخبر", date: "منذ أسبوع", views: 1234, seller: { name: "عبدالله", avatar: "https://i.pravatar.cc/150?img=15" } },
];

export default function FavoritesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">المفضلة</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">المفضلة</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {favoriteListings.map((listing, i) => (
          <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <ListingCard {...listing} isFavorited={true} />
          </motion.div>
        ))}
      </div>

      {favoriteListings.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">لا توجد إعلانات مفضلة</p>
          <Link href="/categories" className="text-brand-600 dark:text-brand-400 hover:underline">تصفح الإعلانات</Link>
        </div>
      )}
    </div>
  );
}
