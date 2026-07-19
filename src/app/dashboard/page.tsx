"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  List,
  Heart,
  MessageCircle,
  Bell,
  User,
  Settings,
  Plus,
  TrendingUp,
  Eye,
  Clock,
  ChevronLeft,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/dashboard" },
  { icon: List, label: "إعلاناتي", href: "/dashboard/listings" },
  { icon: Heart, label: "المفضلة", href: "/dashboard/favorites" },
  { icon: MessageCircle, label: "الرسائل", href: "/chat" },
  { icon: Bell, label: "الإشعارات", href: "/dashboard/notifications" },
  { icon: User, label: "الملف الشخصي", href: "/dashboard/profile" },
  { icon: Settings, label: "الإعدادات", href: "/dashboard/settings" },
];

const statsCards = [
  { label: "إعلاناتي", value: 12, icon: List, color: "from-blue-500 to-blue-600" },
  { label: "المفضلة", value: 28, icon: Heart, color: "from-red-500 to-red-600" },
  { label: "الرسائل", value: 15, icon: MessageCircle, color: "from-green-500 to-green-600" },
  { label: "الإشعارات", value: 5, icon: Bell, color: "from-amber-500 to-amber-600" },
];

const recentListings = [
  { id: "1", title: "آيفون 15 برو", price: 4200, views: 342, status: "active", date: "منذ يوم" },
  { id: "2", title: "لابتوب ماك بوك", price: 6500, views: 189, status: "active", date: "منذ 3 أيام" },
  { id: "3", title: "سماعات أبل", price: 850, views: 78, status: "sold", date: "منذ أسبوع" },
  { id: "4", title: "ساعة أبل ووتش", price: 1200, views: 156, status: "active", date: "منذ أسبوعين" },
];

export default function DashboardPage() {
  const [activeSidebar, setActiveSidebar] = useState("/dashboard");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">لوحة التحكم</h1>
        <p className="text-gray-500 dark:text-gray-400">مرحباً بك، أحمد!</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-4 sticky top-24">
            <div className="space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSidebar === item.href
                      ? "bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5"
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="block text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Link
              href="/post"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-medium rounded-xl shadow-md shadow-brand-500/25 hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              نشر إعلان جديد
            </Link>
          </div>

          {/* Recent Listings */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700/50">
              <h2 className="font-bold text-gray-900 dark:text-white">أحدث إعلاناتي</h2>
              <Link href="/dashboard/listings" className="flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 hover:underline">
                عرض الكل <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-right text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700/50">
                    <th className="px-5 py-3 font-medium">الإعلان</th>
                    <th className="px-5 py-3 font-medium">السعر</th>
                    <th className="px-5 py-3 font-medium">المشاهدات</th>
                    <th className="px-5 py-3 font-medium">الحالة</th>
                    <th className="px-5 py-3 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {recentListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{listing.title}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-brand-600 dark:text-brand-400 font-medium">{listing.price.toLocaleString()} ر.س</td>
                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{listing.views}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg ${
                          listing.status === "active" ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}>
                          {listing.status === "active" ? "نشط" : "مباع"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{listing.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
