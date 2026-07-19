"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Car,
  Smartphone,
  Sofa,
  Shirt,
  Dumbbell,
  PawPrint,
  Briefcase,
  BookOpen,
  Baby,
  Wrench,
  Palette,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "عقارات",
    slug: "real-estate",
    icon: Home,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    id: 2,
    name: "سيارات",
    slug: "cars",
    icon: Car,
    color: "from-red-500 to-red-600",
    bg: "bg-red-50 dark:bg-red-500/10",
  },
  {
    id: 3,
    name: "إلكترونيات",
    slug: "electronics",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 dark:bg-purple-500/10",
  },
  {
    id: 4,
    name: "أثاث ومنزل",
    slug: "furniture",
    icon: Sofa,
    color: "from-amber-500 to-amber-600",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: 5,
    name: "أزياء وموضة",
    slug: "fashion",
    icon: Shirt,
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50 dark:bg-pink-500/10",
  },
  {
    id: 6,
    name: "رياضة",
    slug: "sports",
    icon: Dumbbell,
    color: "from-green-500 to-green-600",
    bg: "bg-green-50 dark:bg-green-500/10",
  },
  {
    id: 7,
    name: "حيوانات أليفة",
    slug: "pets",
    icon: PawPrint,
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 dark:bg-orange-500/10",
  },
  {
    id: 8,
    name: "خدمات",
    slug: "services",
    icon: Wrench,
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50 dark:bg-teal-500/10",
  },
  {
    id: 9,
    name: "وظائف",
    slug: "jobs",
    icon: Briefcase,
    color: "from-indigo-500 to-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
  {
    id: 10,
    name: "كتب ومطبوعات",
    slug: "books",
    icon: BookOpen,
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
  },
  {
    id: 11,
    name: "أطفال",
    slug: "kids",
    icon: Baby,
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    id: 12,
    name: "فنون وم handiCraft",
    slug: "crafts",
    icon: Palette,
    color: "from-violet-500 to-violet-600",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {categories.map((cat) => (
          <motion.div key={cat.id} variants={itemVariants}>
            <Link
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <cat.icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-center">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
