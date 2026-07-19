"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الفئات</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الفئات</h1>
        <button className="flex items-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">
          <Plus className="w-5 h-5" /> إضافة فئة
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700/50">
                <th className="px-5 py-3 font-medium w-10"></th>
                <th className="px-5 py-3 font-medium">الفئة</th>
                <th className="px-5 py-3 font-medium">ال Slug</th>
                <th className="px-5 py-3 font-medium">الفئات الفرعية</th>
                <th className="px-5 py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-4">
                    <GripVertical className="w-4 h-4 text-gray-300 dark:text-gray-600 cursor-grab" />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm" style={{ background: cat.color }}>
                        {cat.nameAr[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{cat.nameAr}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 font-mono">{cat.slug}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{cat.subcategories.length} فئة فرعية</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Edit className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
