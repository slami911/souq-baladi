"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  Wifi,
  WifiOff,
} from "lucide-react";

interface CraftsmanCardProps {
  id: string;
  name: string;
  profession: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  galleryImages: string[];
  priceRange: string;
  isAvailable: boolean;
  phone: string;
  location: string;
}

export default function CraftsmanCard({
  id,
  name,
  profession,
  avatar,
  rating,
  reviewCount,
  yearsExperience,
  galleryImages,
  priceRange,
  isAvailable,
  phone,
  location,
}: CraftsmanCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}`, "_blank");
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-shadow duration-300"
    >
      {/* Gallery preview */}
      <div className="grid grid-cols-3 gap-0.5 h-32">
        {galleryImages.slice(0, 3).map((img, i) => (
          <div
            key={i}
            className={`relative overflow-hidden ${i === 0 ? "col-span-2" : ""}`}
          >
            <img
              src={img}
              alt={`${name} - ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Profile section */}
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={avatar}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md -mt-8 relative z-10"
            />
            {isAvailable ? (
              <div className="absolute -bottom-0.5 -right-0.5 z-20">
                <Wifi className="w-4 h-4 text-green-500 bg-white dark:bg-gray-800 rounded-full" />
              </div>
            ) : (
              <div className="absolute -bottom-0.5 -right-0.5 z-20">
                <WifiOff className="w-4 h-4 text-gray-400 bg-white dark:bg-gray-800 rounded-full" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                {name}
              </h3>
              <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
            </div>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
              {profession}
            </p>
          </div>
        </div>

        {/* Rating & Experience */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {rating}
            </span>
            <span className="text-xs text-gray-400">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{yearsExperience} سنوات خبرة</span>
          </div>
        </div>

        {/* Location & Price */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {priceRange}
          </span>
        </div>

        {/* Available badge */}
        <div className="mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              isAvailable
                ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAvailable ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {isAvailable ? "متاح الآن" : "غير متاح"}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <a
            href={`tel:${phone}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            اتصال
          </a>
          <button
            onClick={openWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            واتساب
          </button>
          <a
            href={`/chat?user=${id}`}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            محادثة
          </a>
        </div>
      </div>
    </motion.div>
  );
}
