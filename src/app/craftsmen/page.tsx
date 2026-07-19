"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, Star, Award, MapPin } from "lucide-react";
import CraftsmanCard from "@/components/CraftsmanCard";
import StatsCounter from "@/components/StatsCounter";
import { CRAFTSMEN_TYPES, CITIES } from "@/lib/constants";

const mockCraftsmen = [
  {
    id: "cr1",
    name: "أحمد الكندي",
    profession: "كهربائي",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 4.9,
    reviewCount: 128,
    yearsExperience: 12,
    galleryImages: [
      "https://picsum.photos/seed/cr1a/400/300",
      "https://picsum.photos/seed/cr1b/400/300",
      "https://picsum.photos/seed/cr1c/400/300",
    ],
    priceRange: "50 - 200 ر.س",
    isAvailable: true,
    phone: "+966500000001",
    location: "الرياض",
  },
  {
    id: "cr2",
    name: "خالد المطيري",
    profession: "سباك",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4.8,
    reviewCount: 95,
    yearsExperience: 8,
    galleryImages: [
      "https://picsum.photos/seed/cr2a/400/300",
      "https://picsum.photos/seed/cr2b/400/300",
      "https://picsum.photos/seed/cr2c/400/300",
    ],
    priceRange: "40 - 150 ر.س",
    isAvailable: true,
    phone: "+966500000002",
    location: "جدة",
  },
  {
    id: "cr3",
    name: "عبدالرحمن السبيعي",
    profession: "نجار",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 4.7,
    reviewCount: 82,
    yearsExperience: 15,
    galleryImages: [
      "https://picsum.photos/seed/cr3a/400/300",
      "https://picsum.photos/seed/cr3b/400/300",
      "https://picsum.photos/seed/cr3c/400/300",
    ],
    priceRange: "100 - 500 ر.س",
    isAvailable: false,
    phone: "+966500000003",
    location: "الدمام",
  },
  {
    id: "cr4",
    name: "فهد الحربي",
    profession: "دهان",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 4.6,
    reviewCount: 67,
    yearsExperience: 10,
    galleryImages: [
      "https://picsum.photos/seed/cr4a/400/300",
      "https://picsum.photos/seed/cr4b/400/300",
      "https://picsum.photos/seed/cr4c/400/300",
    ],
    priceRange: "30 - 120 ر.س",
    isAvailable: true,
    phone: "+966500000004",
    location: "مكة",
  },
  {
    id: "cr5",
    name: "سعد الزهراني",
    profession: "فني تكييف",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: 4.5,
    reviewCount: 54,
    yearsExperience: 7,
    galleryImages: [
      "https://picsum.photos/seed/cr5a/400/300",
      "https://picsum.photos/seed/cr5b/400/300",
      "https://picsum.photos/seed/cr5c/400/300",
    ],
    priceRange: "80 - 300 ر.س",
    isAvailable: true,
    phone: "+966500000005",
    location: "المدينة",
  },
  {
    id: "cr6",
    name: "ياسر العتيبي",
    profession: "ميكانيكي",
    avatar: "https://i.pravatar.cc/150?img=22",
    rating: 4.4,
    reviewCount: 43,
    yearsExperience: 20,
    galleryImages: [
      "https://picsum.photos/seed/cr6a/400/300",
      "https://picsum.photos/seed/cr6b/400/300",
      "https://picsum.photos/seed/cr6c/400/300",
    ],
    priceRange: "100 - 600 ر.س",
    isAvailable: false,
    phone: "+966500000006",
    location: "أبها",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CraftsmenPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const filtered = mockCraftsmen.filter((c) => {
    if (searchQuery && !c.name.includes(searchQuery) && !c.profession.includes(searchQuery)) return false;
    if (selectedProfession && c.profession !== selectedProfession) return false;
    if (selectedCity && c.location !== selectedCity) return false;
    return true;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            الحِرفيون والحرفيات
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 mb-8 max-w-xl mx-auto"
          >
            ابحث عن أفضل الحرفيين في منطقتك
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white/90 dark:bg-gray-800/90 rounded-xl">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن حرفي..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
              />
            </div>
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="px-4 py-3 bg-white/90 dark:bg-gray-800/90 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="">جميع المهن</option>
              {CRAFTSMEN_TYPES.map((t) => (
                <option key={t.id} value={t.nameAr}>{t.nameAr}</option>
              ))}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 bg-white/90 dark:bg-gray-800/90 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="">جميع المدن</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.nameAr}>{c.nameAr}</option>
              ))}
            </select>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-8 relative z-10 mb-12">
          <StatsCounter icon={Users} label="حرفي نشط" value={1200} suffix="+" />
          <StatsCounter icon={Star} label="تقييم متوسط" value={47} suffix="/5" />
          <StatsCounter icon={Award} label="خدمة مكتملة" value={8500} suffix="+" />
        </div>

        {/* Craftsmen Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((craftsman) => (
            <motion.div key={craftsman.id} variants={itemVariants}>
              <CraftsmanCard {...craftsman} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">لا يوجد حرفيين مطابقين</p>
          </div>
        )}
      </div>
    </div>
  );
}
