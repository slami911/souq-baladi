"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import AnimalCard from "@/components/AnimalCard";
import { ANIMAL_TYPES, CITIES } from "@/lib/constants";

const mockAnimals = [
  { id: "an1", image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop", animalType: "كلاب", breed: "جيرمن شيبرد", age: "سنتان", gender: "male" as const, healthStatus: "ممتاز", price: 5000, location: "الرياض", isNegotiable: true },
  { id: "an2", image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop", animalType: "قطط", breed: "سايبيرس فارسي", age: "سنة واحدة", gender: "female" as const, healthStatus: "جيد", price: 3000, location: "جدة", isNegotiable: false },
  { id: "an3", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop", animalType: " horses", breed: "عربي أصيل", age: "5 سنوات", gender: "male" as const, healthStatus: "ممتاز", price: 50000, location: "الدمام", isNegotiable: true },
  { id: "an4", image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=300&fit=crop", animalType: "طيور", breed: "ببغاء رمادي", age: "3 سنوات", gender: "male" as const, healthStatus: "ممتاز", price: 2000, location: "مكة", isNegotiable: false },
  { id: "an5", image: "https://images.unsplash.com/photo-1548199973-ad03f1c23480?w=400&h=300&fit=crop", animalType: "كلاب", breed: "غولدن ريتريفر", age: "سنة واحدة", gender: "female" as const, healthStatus: "ممتاز", price: 4000, location: "المدينة", isNegotiable: true },
  { id: "an6", image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop", animalType: "قطط", breed: "رش🔃", age: "6 أشهر", gender: "male" as const, healthStatus: "جيد جداً", price: 1500, location: "أبها", isNegotiable: false },
  { id: "an7", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop", animalType: "خراف", breed: "خروف نعيمي", age: "سنة", gender: "male" as const, healthStatus: "ممتاز", price: 3500, location: "الرياض", isNegotiable: true },
  { id: "an8", image: "https://images.unsplash.com/photo-1425082661507-6ad94878b34b?w=400&h=300&fit=crop", animalType: "أرانب", breed: "أرنب هولندي", age: "4 أشهر", gender: "female" as const, healthStatus: "جيد", price: 200, location: "جدة", isNegotiable: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimalsPage() {
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockAnimals.filter((a) => {
    if (selectedType && a.animalType !== selectedType) return false;
    if (searchQuery && !a.breed.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:30px_30px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            سوق الحيوانات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 mb-8 max-w-xl mx-auto"
          >
            ابحث عن حيوانات أليفة بجودة عالية من بائعين موثوقين
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center max-w-xl mx-auto px-4 py-3 bg-white/90 dark:bg-gray-800/90 rounded-xl"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن سلالة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 mr-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Animal Type Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4 mb-8">
          <button
            onClick={() => setSelectedType("")}
            className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              !selectedType
                ? "bg-brand-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            الكل
          </button>
          {ANIMAL_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.nameAr)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                selectedType === type.nameAr
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {type.nameAr}
            </button>
          ))}
        </div>

        {/* Animals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {filtered.map((animal) => (
            <motion.div key={animal.id} variants={itemVariants}>
              <AnimalCard {...animal} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد حيوانات مطابقة</p>
          </div>
        )}
      </div>
    </div>
  );
}
