import Link from "next/link";
import { type ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface SectionTitleProps {
  title: string;
  href?: string;
  icon?: ReactNode;
}

export default function SectionTitle({ title, href, icon }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            {icon}
          </span>
        )}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">
            عرض الكل
          </span>
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
