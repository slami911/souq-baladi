"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Search, CheckCircle, XCircle, Star } from "lucide-react";

const mockCraftsmen = [
  { id: "cr1", name: "أحمد الكندي", profession: "كهربائي", city: "الرياض", rating: 4.9, reviews: 128, status: "approved", joinDate: "2024-01-10" },
  { id: "cr2", name: "خالد المطيري", profession: "سباك", city: "جدة", rating: 4.8, reviews: 95, status: "approved", joinDate: "2024-02-15" },
  { id: "cr3", name: "عبدالرحمن السبيعي", profession: "نجار", city: "الدمام", rating: 4.7, reviews: 82, status: "pending", joinDate: "2024-03-20" },
  { id: "cr4", name: "فهد الحربي", profession: "دهان", city: "مكة", rating: 4.6, reviews: 67, status: "approved", joinDate: "2024-04-05" },
];

export default function AdminCraftsmenPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الحرفيون</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الحرفيين</h1>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="بحث..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-right text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700/50">
                <th className="px-5 py-3 font-medium">الحرفي</th>
                <th className="px-5 py-3 font-medium">المهنة</th>
                <th className="px-5 py-3 font-medium">المدينة</th>
                <th className="px-5 py-3 font-medium">التقييم</th>
                <th className="px-5 py-3 font-medium">التقييمات</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {mockCraftsmen.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm">{c.name[0]}</div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{c.profession}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{c.city}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{c.reviews}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${c.status === "approved" ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600"}`}>
                      {c.status === "approved" ? "معتمد" : "قيد المراجعة"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><CheckCircle className="w-4 h-4 text-green-400" /></button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><XCircle className="w-4 h-4 text-red-400" /></button>
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
