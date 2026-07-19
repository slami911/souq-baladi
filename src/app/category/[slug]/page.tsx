"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
} from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { CATEGORIES, CITIES, SORT_OPTIONS, CONDITION_OPTIONS } from "@/lib/constants";

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

const mockListings = Array.from({ length: 12 }, (_, i) => ({
  id: `cl${i + 1}`,
  title: `${["آيفون", "سامسونج", "هواوي", "شياومي"][i % 4]} ${["15 برو", "Galaxy S24", "P60", "13T"][i % 4]}`,
  description: "جهاز بحالة ممتازة",
  price: [4200, 3800, 2500, 1800][i % 4] * (1 + i * 0.1),
  negotiable: i % 2 === 0,
  images: [
    `https://picsum.photos/seed/${i + 10}/400/300`,
    `https://picsum.photos/seed/${i + 20}/400/300`,
  ],
  category: "electronics",
  condition: (["new", "like_new", "used"] as const)[i % 3],
  city: CITIES[i % CITIES.length].nameAr,
  location: `حي ${["النزهة", "الروضة", "الملقا", "الفيصلية"][i % 4]}`,
  userId: `u${i + 1}`,
  user: { ...mockUser, id: `u${i + 1}`, name: ["أحمد", "سارة", "خالد", "فاطمة"][i % 4] },
  views: 100 + i * 50,
  likes: 10 + i * 5,
  isFeatured: i < 3,
  isActive: true,
  createdAt: new Date(Date.now() - i * 3600000),
  updatedAt: new Date(),
}));

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const category = CATEGORIES.find((c) => c.slug === "cars");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/categories" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          الفئات
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">
          {category?.nameAr || "الفئة"}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Subcategories */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">الفئات الفرعية</h3>
              <div className="space-y-2">
                {category?.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${category?.slug}/${sub.slug}`}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span>{sub.nameAr}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">نطاق السعر</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="من"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <input
                  type="number"
                  placeholder="إلى"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Condition */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">الحالة</h3>
              <div className="space-y-2">
                {CONDITION_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCondition(selectedCondition === opt.id ? "" : opt.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      selectedCondition === opt.id
                        ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">المدينة</h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">جميع المدن</option>
                {CITIES.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.nameAr}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">ترتيب حسب</h3>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">الافتراضي</option>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{category?.nameAr || "الفئة"}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockListings.length} إعلان</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors hidden sm:flex"
              >
                {viewMode === "grid" ? (
                  <List className="w-5 h-5 text-gray-500" />
                ) : (
                  <Grid3X3 className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                فلتر
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {mockListings.map((listing) => (
              <ListingCard
                key={listing.id}
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
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">الفلاتر</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">نطاق السعر</h3>
                  <div className="flex gap-2">
                    <input type="number" placeholder="من" className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                    <input type="number" placeholder="إلى" className="flex-1 px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">الحالة</h3>
                  <div className="space-y-2">
                    {CONDITION_OPTIONS.map((opt) => (
                      <button key={opt.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                        {opt.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">المدينة</h3>
                  <select className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="">جميع المدن</option>
                    {CITIES.map((city) => (
                      <option key={city.id} value={city.slug}>{city.nameAr}</option>
                    ))}
                  </select>
                </div>
                <button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">
                  تطبيق الفلاتر
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
