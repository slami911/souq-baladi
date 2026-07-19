"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Search, Eye, Trash2, CheckCircle, XCircle } from "lucide-react";

const mockListings = [
  { id: "l1", title: "آيفون 15 برو ماكس", price: 4200, user: "أحمد", category: "إلكترونيات", status: "active", date: "2024-07-15", views: 342 },
  { id: "l2", title: "شقة فاخرة 3 غرف", price: 3200, user: "سارة", category: "عقارات", status: "pending", date: "2024-07-14", views: 567 },
  { id: "l3", title: "تويوتا كامري 2023", price: 95000, user: "خالد", category: "سيارات", status: "active", date: "2024-07-13", views: 891 },
  { id: "l4", title: "أريكة مودرن", price: 2500, user: "فاطمة", category: "أثاث", status: "rejected", date: "2024-07-12", views: 234 },
  { id: "l5", title: "سماعات أبل", price: 850, user: "عمر", category: "إلكترونيات", status: "active", date: "2024-07-11", views: 178 },
];

export default function AdminListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الإعلانات</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الإعلانات</h1>
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
                <th className="px-5 py-3 font-medium">الإعلان</th>
                <th className="px-5 py-3 font-medium">المستخدم</th>
                <th className="px-5 py-3 font-medium">الفئة</th>
                <th className="px-5 py-3 font-medium">السعر</th>
                <th className="px-5 py-3 font-medium">المشاهدات</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {mockListings.map((listing) => (
                <tr key={listing.id} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gray-900 dark:text-white">{listing.title}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{listing.user}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{listing.category}</td>
                  <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400 font-medium">{listing.price.toLocaleString()} ر.س</td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{listing.views}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${listing.status === "active" ? "bg-green-50 dark:bg-green-500/10 text-green-600" : listing.status === "pending" ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"}`}>
                      {listing.status === "active" ? "نشط" : listing.status === "pending" ? "قيد المراجعة" : "مرفوض"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Eye className="w-4 h-4 text-gray-400" /></button>
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
