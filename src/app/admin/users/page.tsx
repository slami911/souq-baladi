"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Search, Shield, Ban, CheckCircle, MoreVertical } from "lucide-react";

const mockUsers = [
  { id: "u1", name: "أحمد العتيبي", email: "ahmed@email.com", phone: "+966500000001", role: "user", listings: 12, status: "active", joinDate: "2024-01-15" },
  { id: "u2", name: "سارة الحربي", email: "sara@email.com", phone: "+966500000002", role: "user", listings: 8, status: "active", joinDate: "2024-02-20" },
  { id: "u3", name: "خالد الشمري", email: "khalid@email.com", phone: "+966500000003", role: "craftsman", listings: 25, status: "active", joinDate: "2023-11-10" },
  { id: "u4", name: "فاطمة الزهراني", email: "fatima@email.com", phone: "+966500000004", role: "user", listings: 3, status: "suspended", joinDate: "2024-03-05" },
  { id: "u5", name: "محمد القحطاني", email: "mohammed@email.com", phone: "+966500000005", role: "admin", listings: 0, status: "active", joinDate: "2023-06-01" },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/admin" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">لوحة التحكم</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">المستخدمين</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة المستخدمين</h1>
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
                <th className="px-5 py-3 font-medium">المستخدم</th>
                <th className="px-5 py-3 font-medium">البريد</th>
                <th className="px-5 py-3 font-medium">الدور</th>
                <th className="px-5 py-3 font-medium">الإعلانات</th>
                <th className="px-5 py-3 font-medium">الحالة</th>
                <th className="px-5 py-3 font-medium">تاريخ الانضمام</th>
                <th className="px-5 py-3 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 dark:border-gray-700/30 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm">
                        {user.name[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${user.role === "admin" ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600" : user.role === "craftsman" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600" : "bg-gray-100 dark:bg-gray-700 text-gray-600"}`}>
                      {user.role === "admin" ? "مدير" : user.role === "craftsman" ? "حرفي" : "مستخدم"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.listings}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-lg ${user.status === "active" ? "bg-green-50 dark:bg-green-500/10 text-green-600" : "bg-red-50 dark:bg-red-500/10 text-red-600"}`}>
                      {user.status === "active" ? "نشط" : "معلق"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joinDate}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><CheckCircle className="w-4 h-4 text-green-400" /></button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"><Ban className="w-4 h-4 text-red-400" /></button>
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
