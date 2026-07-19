"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, MapPin, SlidersHorizontal } from "lucide-react";

const cities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الظهران",
  "الخبر",
  "عجمان",
  "أبو ظبي",
  "دبي",
  "الشارقة",
  "ال kuwait",
  "المنامة",
  "مسقط",
];

const categories = [
  "عقارات",
  "سيارات",
  "إلكترونيات",
  "أثاث ومنزل",
  "أزياء وموضة",
  "رياضة",
  "حيوانات أليفة",
  "خدمات",
  "وظائف",
  "education",
  "كتب ومطبوعات",
  "مهنتech",
];

interface SearchBarProps {
  variant?: "hero" | "header";
  className?: string;
}

export default function SearchBar({
  variant = "header",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setIsCityOpen(false);
      }
      if (
        categoryRef.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isHero ? "w-full max-w-3xl mx-auto" : "w-full max-w-2xl"} ${className}`}
    >
      <div
        className={`flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg ${
          isHero ? "shadow-xl shadow-gray-200/50 dark:shadow-black/20" : ""
        }`}
      >
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 px-4">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن ما تريد..."
            className="w-full py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

        {/* City Selector */}
        <div ref={cityRef} className="relative hidden sm:block">
          <button
            onClick={() => {
              setIsCityOpen(!isCityOpen);
              setIsCategoryOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {selectedCity || "المدينة"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isCityOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isCityOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-64 overflow-y-auto"
              >
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCity === city
                        ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Selector */}
        <div ref={categoryRef} className="relative hidden md:block">
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsCityOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
              {selectedCategory || "الفئة"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-64 overflow-y-auto"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCategory === cat
                        ? "text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98]">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">بحث</span>
        </button>

        {/* Mobile expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="sm:hidden p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Mobile expanded filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="flex gap-2 mt-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">المدينة</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="">الفئة</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
