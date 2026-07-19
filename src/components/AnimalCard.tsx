"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Tag, Shield, DollarSign } from "lucide-react";

interface AnimalCardProps {
  id: string;
  image: string;
  animalType: string;
  breed: string;
  age: string;
  gender: "male" | "female";
  healthStatus: string;
  price: number;
  currency?: string;
  location: string;
  isNegotiable?: boolean;
  isFavorited?: boolean;
}

export default function AnimalCard({
  id,
  image,
  animalType,
  breed,
  age,
  gender,
  healthStatus,
  price,
  currency = "ر.س",
  location,
  isNegotiable = false,
  isFavorited = false,
}: AnimalCardProps) {
  const [favorite, setFavorite] = useState(isFavorited);
  const [imgError, setImgError] = useState(false);

  return (
    <a href={`/listings/${id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
          {!imgError ? (
            <img
              src={image}
              alt={`${animalType} - ${breed}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
          )}

          {/* Animal type badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-bold text-gray-900 dark:text-white rounded-lg shadow-sm">
            {animalType}
          </div>

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFavorite(!favorite);
            }}
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

          {/* Gender indicator */}
          <div
            className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
              gender === "male"
                ? "bg-blue-500"
                : "bg-pink-500"
            }`}
          >
            {gender === "male" ? "♂" : "♀"}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {breed}
            </h3>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-300">
              <Tag className="w-3 h-3" />
              {age}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-500/10 rounded-lg text-xs text-green-600 dark:text-green-400">
              <Shield className="w-3 h-3" />
              {healthStatus}
            </span>
            {isNegotiable && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-xs text-amber-600 dark:text-amber-400">
                <DollarSign className="w-3 h-3" />
                قابل للتفاوض
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
            <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
              {price.toLocaleString("ar-EG")} {currency}
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
}
