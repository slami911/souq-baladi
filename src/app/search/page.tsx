"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, SlidersHorizontal, X, ChevronLeft, Grid3X3, List } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { CATEGORIES, CITIES, SORT_OPTIONS, CONDITION_OPTIONS } from "@/lib/constants";

const mockUser = {
  id: "u1", name: "أحمد", email: "ahmed@test.com", phone: "+966500000000",
  avatar: "https://i.pravatar.cc/150?img=11", cover: "", bio: "", location: "الرياض",
  role: "user" as const, verified: true, twoFactorEnabled: false, createdAt: new Date(),
};

const mockResults = Array.from({ length: 9 }, (_, i) => ({
  id: `sr${i + 1}`,
  title: `${["آيفون 15 برو", "شقة فاخرة", "تويوتا كامري", "لابتوب ماك بوك", "أريكة جلد", "سماعات أبل", "ساعة ووتش", "كيبورد ميكانيكي", "شاشة سامسونج"][i]}`,
  price: [4200, 3200, 95000, 6500, 2500, 850, 1200, 599, 1800][i],
  images: [`https://picsum.photos/seed/sr${i + 1}/400/300`],
  location: CITIES[i % CITIES.length].nameAr,
  date: ["منذ ساعتين", "منذ يوم", "منذ 3 أيام", "منذ أسبوع", "منذ يومين", "منذ 5 ساعات", "منذ 4 أيام", "منذ أسبوعين", "منذ 3 ساعات"][i],
  views: 100 + i * 50,
  seller: { name: ["أحمد", "سارة", "خالد", "فاطمة", "عمر", "محمد", "نورة", "خالد", "سارة"][i], avatar: `https://i.pravatar.cc/150?img=${i + 1}` },
}));

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Search Bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex-1 flex items-center gap-2 px-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن أي شيء..."
              className="w-full py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base"
            />
            {query && (
              <button onClick={() => setQuery("")} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
          <button className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium text-sm transition-colors">
            بحث
          </button>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">الفئة</h3>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">جميع الفئات</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.nameAr}</option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">المدينة</h3>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">جميع المدن</option>
                {CITIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.nameAr}</option>
                ))}
              </select>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">الحالة</h3>
              <div className="space-y-2">
                {CONDITION_OPTIONS.map((opt) => (
                  <button key={opt.id} onClick={() => setSelectedCondition(selectedCondition === opt.id ? "" : opt.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${selectedCondition === opt.id ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"}`}>
                    <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">ترتيب حسب</h3>
              <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                <option value="">الافتراضي</option>
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">نتائج البحث</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockResults.length} نتيجة</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors hidden sm:flex">
                {viewMode === "grid" ? <List className="w-5 h-5 text-gray-500" /> : <Grid3X3 className="w-5 h-5 text-gray-500" />}
              </button>
              <button onClick={() => setShowFilters(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl text-sm font-medium transition-colors lg:hidden">
                <SlidersHorizontal className="w-4 h-4" /> فلتر
              </button>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`grid gap-4 sm:gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {mockResults.map((listing) => (
              <ListingCard
                key={listing.id}
                id={listing.id}
                title={listing.title}
                price={listing.price}
                images={listing.images}
                location={listing.location}
                date={listing.date}
                views={listing.views}
                seller={listing.seller}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setShowFilters(false)}>
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">الفلاتر</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">الفئة</h3>
                  <select className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="">جميع الفئات</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.nameAr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">المدينة</h3>
                  <select className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="">جميع المدن</option>
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.slug}>{c.nameAr}</option>
                    ))}
                  </select>
                </div>
                <button className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">تطبيق الفلاتر</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
