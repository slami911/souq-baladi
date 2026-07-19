"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Plus, Edit, Trash2 } from "lucide-react";
import { CITIES } from "@/lib/constants";

export default function AdminCitiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">المدن</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة المدن</h1>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">
          <Plus className="w-5 h-5" /> إضافة مدينة
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CITIES.map((city, i) => (
          <motion.div key={city.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{city.nameAr}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{city.slug}</p>
            </div>
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
