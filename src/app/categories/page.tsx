"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car,
  Bike,
  Home,
  Smartphone,
  Sofa,
  Shirt,
  Briefcase,
  Dog,
  Dumbbell,
  Baby,
  BookOpen,
  Heart,
  Wrench,
  Apple,
  Hammer,
  Music,
  Gamepad2,
  PartyPopper,
  Plane,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  Bike,
  Home,
  Smartphone,
  Sofa,
  Shirt,
  Briefcase,
  Dog,
  Dumbbell,
  Baby,
  BookOpen,
  Heart,
  Wrench,
  Apple,
  Hammer,
  Music,
  Gamepad2,
  PartyPopper,
  Plane,
  MoreHorizontal,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
          الرئيسية
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">الفئات</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          جميع الفئات
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          تصفح جميع الفئات المتوفرة في سوق بلدي
        </p>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon] || MoreHorizontal;
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/category/${category.slug}`}>
                <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="flex items-center justify-center w-14 h-14 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: category.color }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-brand-500 group-hover:-translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {category.nameAr}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg"
                        >
                          {sub.nameAr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
