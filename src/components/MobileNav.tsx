"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Grid3X3,
  Plus,
  MessageCircle,
  User,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: Grid3X3, label: "الفئات", href: "/categories" },
  { icon: Plus, label: "نشر إعلان", href: "/post-ad", isFab: true },
  { icon: MessageCircle, label: "المحادثات", href: "/chat" },
  { icon: User, label: "حسابي", href: "/profile" },
];

export default function MobileNav() {
  const [active, setActive] = useState("/");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = active === item.href;
          const isFab = item.isFab;

          if (isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.href)}
                className="relative -mt-6"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 active:scale-95 transition-all">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className="relative flex flex-col items-center justify-center gap-1 py-2 px-3"
            >
              <div className="relative">
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-600 dark:bg-brand-400 rounded-full"
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
