"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Bell, Check, Trash2 } from "lucide-react";

const notifications = [
  { id: "n1", title: "إعلان جديد في منطقتك", message: "تم نشر إعلان جديد لشقة في حي الملقا بالقرب منك", time: "منذ 5 دقائق", read: false, type: "listing" },
  { id: "n2", title: "تمت إضافة إعلانك للمفضلة", message: "أحمد أضاف إعلانك إلى قائمة المفضلة", time: "منذ ساعة", read: false, type: "like" },
  { id: "n3", title: "رسالة جديدة", message: "لديك رسالة جديدة من سارة", time: "منذ 3 ساعات", read: true, type: "message" },
  { id: "n4", title: "تم تحديث إعلانك", message: "تم تحديث حالة إعلانك بنجاح", time: "منذ يوم", read: true, type: "update" },
  { id: "n5", title: "عرض خاص", message: "خصم 20% على جميع الخدمات هذا الأسبوع", time: "منذ يومين", read: true, type: "promo" },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الإشعارات</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الإشعارات</h1>
        <button className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:underline">
          <Check className="w-4 h-4" /> تحديد الكل كمقروء
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-white dark:bg-gray-800 rounded-2xl border p-5 flex items-start gap-4 ${!notif.read ? "border-brand-200 dark:border-brand-500/30 bg-brand-50/30 dark:bg-brand-500/5" : "border-gray-100 dark:border-gray-700/50"}`}>
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${!notif.read ? "bg-brand-100 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400" : "bg-gray-100 dark:bg-gray-700 text-gray-400"}`}>
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-sm ${!notif.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>{notif.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
            <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0">
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </motion.div>
      ))}
      </div>
    </div>
  );
}
