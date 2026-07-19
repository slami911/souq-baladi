"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Eye, Heart, Edit, Trash2, ChevronLeft } from "lucide-react";

const myListings = [
  { id: "1", title: "آيفون 15 برو ماكس - 256 جيجا", price: 4200, views: 342, likes: 28, status: "active", date: "منذ يوم", image: "https://picsum.photos/seed/my1/100/100" },
  { id: "2", title: "لابتوب ماك بوك برو M3", price: 6500, views: 189, likes: 15, status: "active", date: "منذ 3 أيام", image: "https://picsum.photos/seed/my2/100/100" },
  { id: "3", title: "سماعات أبل AirPods Pro", price: 850, views: 78, likes: 7, status: "sold", date: "منذ أسبوع", image: "https://picsum.photos/seed/my3/100/100" },
  { id: "4", title: "ساعة أبل ووتش Ultra 2", price: 1200, views: 156, likes: 12, status: "active", date: "منذ أسبوعين", image: "https://picsum.photos/seed/my4/100/100" },
  { id: "5", title: "كيبورد ميكانيكي لوغو", price: 599, views: 45, likes: 3, status: "inactive", date: "منذ 3 أسابيع", image: "https://picsum.photos/seed/my5/100/100" },
];

export default function MyListingsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = myListings.filter((l) => {
    if (filter === "all") return true;
    return l.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">إعلاناتي</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إعلاناتي</h1>
        <Link href="/post" className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-xl">
          <Plus className="w-5 h-5" /> نشر إعلان
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "الكل" },
          { id: "active", label: "نشط" },
          { id: "sold", label: "مباع" },
          { id: "inactive", label: "غير نشط" },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f.id ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((listing, i) => (
          <motion.div key={listing.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-4 sm:p-5 flex items-center gap-4">
            <img src={listing.image} alt={listing.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">{listing.title}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{listing.views}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{listing.likes}</span>
                <span>{listing.date}</span>
              </div>
            </div>
            <span className="text-lg font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{listing.price.toLocaleString()} ر.س</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-lg ${listing.status === "active" ? "bg-green-50 dark:bg-green-500/10 text-green-600" : listing.status === "sold" ? "bg-gray-100 dark:bg-gray-700 text-gray-500" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600"}`}>
              {listing.status === "active" ? "نشط" : listing.status === "sold" ? "مباع" : "غير نشط"}
            </span>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Edit className="w-4 h-4 text-gray-400" /></button>
              <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
