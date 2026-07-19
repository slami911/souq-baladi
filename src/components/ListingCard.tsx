"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Clock,
  Eye,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  images: string[];
  location: string;
  date: string;
  views: number;
  isFeatured?: boolean;
  condition?: string;
  seller: {
    name: string;
    avatar: string;
  };
  isFavorited?: boolean;
}

export default function ListingCard({
  id,
  title,
  price,
  currency = "ر.س",
  images,
  location,
  date,
  views,
  isFeatured = false,
  condition,
  seller,
  isFavorited = false,
}: ListingCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [favorite, setFavorite] = useState(isFavorited);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
  };

  return (
    <Link href={`/listings/${id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-shadow duration-300"
      >
        {/* Image Carousel */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <motion.div
            className="flex h-full"
            animate={{ x: `-${currentImage * 100}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {images.map((img, i) => (
              <div key={i} className="flex-shrink-0 w-full h-full">
                <img
                  src={img}
                  alt={`${title} - صورة ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>

          {isFeatured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              مميز
            </div>
          )}

          {condition && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium text-gray-700 dark:text-gray-300 rounded-lg">
              {condition}
            </div>
          )}

          <button
            onClick={toggleFavorite}
            className="absolute bottom-3 left-3 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>

          {images.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImage(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImage
                      ? "w-5 bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {price.toLocaleString("ar-EG")} {currency}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center gap-2">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {seller.name}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Eye className="w-3.5 h-3.5" />
              {views}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
