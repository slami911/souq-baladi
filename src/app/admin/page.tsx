"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  List,
  Briefcase,
  Grid3X3,
  MapPin,
  Flag,
  TrendingUp,
  Eye,
  DollarSign,
  Activity,
  ChevronLeft,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: "/admin" },
  { icon: Users, label: "المستخدمين", href: "/admin/users" },
  { icon: List, label: "الإعلانات", href: "/admin/listings" },
  { icon: Briefcase, label: "الحرفيون", href: "/admin/craftsmen" },
  { icon: Grid3X3, label: "الفئات", href: "/admin/categories" },
  { icon: MapPin, label: "المدن", href: "/admin/cities" },
  { icon: Flag, label: "البلاغات", href: "/admin/reports" },
];

const stats = [
  { label: "إجمالي المستخدمين", value: "12,450", change: "+12%", icon: Users, color: "from-blue-500 to-blue-600" },
  { label: "إجمالي الإعلانات", value: "45,230", change: "+8%", icon: List, color: "from-green-500 to-green-600" },
  { label: "الإيرادات", value: "98,500 ر.س", change: "+15%", icon: DollarSign, color: "from-amber-500 to-amber-600" },
  { label: "البلاغات المعلقة", value: "23", change: "-5%", icon: Flag, color: "from-red-500 to-red-600" },
];

const recentActivity = [
  { id: "1", action: "مستخدم جديد", detail: "سارة أحمد قمت بالتسجيل", time: "منذ 5 دقائق", icon: Users },
  { id: "2", action: "إعلان جديد", detail: "آيفون 15 برو - الرياض", time: "منذ 15 دقيقة", icon: List },
  { id: "3", action: "بلاغ جديد", detail: "إبلاغ عن إعلان مخالف", time: "منذ ساعة", icon: Flag },
  { id: "4", action: "حرفي جديد", detail: "أحمد الكندي - كهربائي", time: "منذ 3 ساعات", icon: Briefcase },
];

export default function AdminPage() {
  const [activeSidebar, setActiveSidebar] = useState("/admin");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">لوحة تحكم الإدارة</h1>
        <p className="text-gray-500 dark:text-gray-400">مرحباً بك في لوحة التحكم</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${stat.change.startsWith("+") ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="block text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-4">نظرة عامة على الإعلانات</h2>
            <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-gray-400 dark:text-gray-500">رسم بياني (قريباً)</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700/50">
              <h2 className="font-bold text-gray-900 dark:text-white">آخر النشاطات</h2>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700/30">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <activity.icon className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{activity.action}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
