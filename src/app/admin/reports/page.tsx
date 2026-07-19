"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Eye, CheckCircle, XCircle, Flag, AlertTriangle } from "lucide-react";

const mockReports = [
  { id: "r1", reporter: "سارة", reportedUser: "مجهول", listingTitle: "إعلان مريب", reason: "محتوى مخالف", date: "2024-07-15", status: "pending" },
  { id: "r2", reporter: "خالد", reportedUser: "محمد", listingTitle: "سعر غير واقعي", reason: "احتيال محتمل", date: "2024-07-14", status: "pending" },
  { id: "r3", reporter: "فاطمة", reportedUser: "أحمد", listingTitle: "إعلان مكرر", reason: "إعادة نشر", date: "2024-07-13", status: "resolved" },
  { id: "r4", reporter: "عبدالله", reportedUser: "خالد", listingTitle: "صور غير حقيقية", reason: "خداع", date: "2024-07-12", status: "dismissed" },
];

export default function AdminReportsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = mockReports.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">البلاغات</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة البلاغات</h1>
      </div>

      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "الكل" },
          { id: "pending", label: "قيد المراجعة" },
          { id: "resolved", label: "تم الحل" },
          { id: "dismissed", label: "مرفوض" },
        ].map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === f.id ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((report, i) => (
          <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${report.status === "pending" ? "bg-amber-100 dark:bg-amber-500/20 text-amber-600" : report.status === "resolved" ? "bg-green-100 dark:bg-green-500/20 text-green-600" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{report.reason}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">الإعلان: {report.listingTitle}</p>
                  <p className="text-xs text-gray-400 mt-1">المبلّغ: {report.reporter} | التاريخ: {report.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Eye className="w-4 h-4 text-gray-400" /></button>
                <button className="p-2 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors"><CheckCircle className="w-4 h-4 text-green-400" /></button>
                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"><XCircle className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
