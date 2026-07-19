"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, Building2, MapPin, type LucideIcon } from "lucide-react";

interface StatsCounterProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
}

export default function StatsCounter({
  icon: Icon,
  label,
  value,
  suffix = "",
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  const formattedValue =
    displayValue >= 1000
      ? `${(displayValue / 1000).toFixed(displayValue >= 10000 ? 0 : 1)}K`
      : displayValue.toLocaleString("ar-EG");

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/25">
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-center">
        <span className="block text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tabular-nums">
          {formattedValue}
          {suffix && (
            <span className="text-lg text-brand-600 dark:text-brand-400">
              {suffix}
            </span>
          )}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
