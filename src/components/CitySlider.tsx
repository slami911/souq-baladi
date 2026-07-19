"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const cities = [
  {
    id: 1,
    name: "الرياض",
    slug: "riyadh",
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=400&h=300&fit=crop",
    count: 12500,
  },
  {
    id: 2,
    name: "جدة",
    slug: "jeddah",
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=400&h=300&fit=crop",
    count: 8900,
  },
  {
    id: 3,
    name: "مكة المكرمة",
    slug: "makkah",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop",
    count: 6700,
  },
  {
    id: 4,
    name: "المدينة المنورة",
    slug: "madinah",
    image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=400&h=300&fit=crop",
    count: 4200,
  },
  {
    id: 5,
    name: "الدمام",
    slug: "dammam",
    image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=400&h=300&fit=crop",
    count: 5600,
  },
  {
    id: 6,
    name: "الظهران",
    slug: "dhahran",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
    count: 3100,
  },
  {
    id: 7,
    name: "الخبر",
    slug: "khobar",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&h=300&fit=crop",
    count: 2800,
  },
  {
    id: 8,
    name: "أبها",
    slug: "abha",
    image: "https://images.unsplash.com/photo-1586724237641-a3955419b5bf?w=400&h=300&fit=crop",
    count: 1500,
  },
];

export default function CitySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-12 sm:py-16">
      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden sm:flex"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden sm:flex"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cities.map((city, i) => (
            <motion.a
              key={city.id}
              href={`/city/${city.slug}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex-shrink-0 w-64 sm:w-72 snap-start"
            >
              <div className="relative h-44 rounded-2xl overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 right-0 left-0 p-4">
                  <h3 className="text-white font-bold text-lg mb-1">
                    {city.name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {city.count.toLocaleString("ar-EG")} إعلان
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
