"use client";

import { motion } from "framer-motion";
import {
  Home,
  Car,
  Smartphone,
  Sofa,
  Shirt,
  Dumbbell,
  PawPrint,
  Briefcase,
} from "lucide-react";
import SearchBar from "./SearchBar";
import StatsCounter from "./StatsCounter";
import { Users, Building2, MapPin } from "lucide-react";

const floatingIcons = [
  { Icon: Home, delay: 0, x: "10%", y: "20%" },
  { Icon: Car, delay: 0.2, x: "85%", y: "15%" },
  { Icon: Smartphone, delay: 0.4, x: "75%", y: "70%" },
  { Icon: Sofa, delay: 0.6, x: "15%", y: "75%" },
  { Icon: Shirt, delay: 0.8, x: "5%", y: "45%" },
  { Icon: Dumbbell, delay: 1, x: "90%", y: "45%" },
  { Icon: PawPrint, delay: 1.2, x: "92%", y: "80%" },
  { Icon: Briefcase, delay: 1.4, x: "8%", y: "90%" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 dark:from-brand-700 dark:via-brand-600 dark:to-brand-800">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:40px_40px]" />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10 hidden lg:block"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { delay, duration: 0.5 },
            scale: { delay, duration: 0.5 },
            y: {
              delay,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Icon className="w-10 h-10 lg:w-16 lg:h-16" strokeWidth={1} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        {/* Main content */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            <span className="block">ابدأ البحث عن</span>
            <span className="text-yellow-300">ما تريد</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 sm:mb-10 px-4"
          >
            سوق بلدي - سوقك المحلي للبيع والشراء. ابحث عن آلاف الإعلانات في
            مدينتك
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <SearchBar variant="hero" />
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <StatsCounter icon={Users} label="مستخدم نشط" value={50000} suffix="+" />
          <StatsCounter icon={Building2} label="إعلان منشور" value={120000} suffix="+" />
          <StatsCounter icon={MapPin} label="مدينة" value={15} />
        </motion.div>
      </div>
    </section>
  );
}
