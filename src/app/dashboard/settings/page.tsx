"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Shield, Bell, Globe, Lock, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [language, setLanguage] = useState("ar");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/dashboard" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الإعدادات</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">الإعدادات</h1>

      <div className="max-w-2xl space-y-6">
        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-brand-500" />
            <h2 className="font-bold text-gray-900 dark:text-white">إشعارات البريد الإلكتروني</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "إشعارات الإعلانات الجديدة", checked: emailNotifications, onChange: setEmailNotifications },
              { label: "إشعارات الرسائل", checked: pushNotifications, onChange: setPushNotifications },
              { label: "إشعارات العروض والخصومات", checked: smsNotifications, onChange: setSmsNotifications },
            ].map((item, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                <div className="relative">
                  <input type="checkbox" checked={item.checked} onChange={(e) => item.onChange(e.target.checked)} className="sr-only" />
                  <div className={`w-11 h-6 rounded-full transition-colors ${item.checked ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform mt-0.5 ${item.checked ? "translate-x-0.5 rtl:-translate-x-0.5" : "translate-x-5 rtl:-translate-x-5"}`} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Language */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-brand-500" />
            <h2 className="font-bold text-gray-900 dark:text-white">اللغة</h2>
          </div>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-brand-500" />
            <h2 className="font-bold text-gray-900 dark:text-white">الأمان</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              تغيير كلمة المرور <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              المصادقة الثنائية <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h2 className="font-bold text-red-600 dark:text-red-400">حذف الحساب</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">سيتم حذف حسابك نهائياً ولا يمكن التراجع عن هذا الإجراء.</p>
          <button className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors">
            حذف الحساب
          </button>
        </motion.div>
      </div>
    </div>
  );
}
