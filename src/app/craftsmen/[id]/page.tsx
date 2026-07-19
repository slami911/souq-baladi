"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle,
  ChevronLeft,
  Shield,
  Wifi,
  WifiOff,
  Camera,
  Send,
} from "lucide-react";

const mockCraftsman = {
  id: "cr1",
  name: "أحمد الكندي",
  profession: "كهربائي",
  avatar: "https://i.pravatar.cc/150?img=11",
  rating: 4.9,
  reviewCount: 128,
  yearsExperience: 12,
  priceRange: "50 - 200 ر.س",
  isAvailable: true,
  phone: "+966500000001",
  whatsapp: "+966500000001",
  location: "الرياض - حي النزهة",
  bio: "كهربائي محترف بخبرة تزيد عن 12 عاماً. متخصص في أعمال التمديدات الكهربائية والصيانة. أضمن جودة العمل والالتزام بالمواعيد.",
  gallery: [
    { id: "g1", url: "https://picsum.photos/seed/g1/600/400", caption: "تمديد كهرباء منزلي" },
    { id: "g2", url: "https://picsum.photos/seed/g2/600/400", caption: "صيانة لوحة كهربائية" },
    { id: "g3", url: "https://picsum.photos/seed/g3/600/400", caption: "تركيب إضاءة" },
    { id: "g4", url: "https://picsum.photos/seed/g4/600/400", caption: "إصلاح مولد كهربائي" },
    { id: "g5", url: "https://picsum.photos/seed/g5/600/400", caption: "تمديد إنارة خارجية" },
    { id: "g6", url: "https://picsum.photos/seed/g6/600/400", caption: "تركيب بانل كهربائي" },
  ],
  services: [
    { id: "s1", name: "تمديد كهرباء منزلي", price: 200, description: "تمديد كامل للكهرباء المنزلية" },
    { id: "s2", name: "إصلاح لوحة كهربائية", price: 150, description: "فحص وإصلاح جميع أعطال اللوحة" },
    { id: "s3", name: "تركيب إضاءة", price: 50, description: "تركيب جميع أنواع الإضاءة" },
    { id: "s4", name: "صيانة دورية", price: 100, description: "فحص وصيانة شاملة" },
    { id: "s5", name: "تركيب مولد كهربائي", price: 300, description: "تركيب وتشغيل المولدات" },
  ],
  reviews: [
    {
      id: "r1",
      user: "خالد الشمري",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      comment: "عمل ممتاز وانجاز سريع. أنصح بالتعامل معه.",
      date: "منذ 3 أيام",
    },
    {
      id: "r2",
      user: "سارة الحربي",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      comment: "محترف جداً وprices معقولة. سأتعامل معه مجدداً.",
      date: "منذ أسبوع",
    },
    {
      id: "r3",
      user: "محمد القحطاني",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 4,
      comment: "عمل جيد ولكن التأخير قليلاً. المهمة أنجزت بشكل مقبول.",
      date: "منذ أسبوعين",
    },
  ],
};

export default function CraftsmanProfilePage() {
  const [activeTab, setActiveTab] = useState<"gallery" | "services" | "reviews">("gallery");
  const craftsman = mockCraftsman;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/craftsmen" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">الحرفيون</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">{craftsman.name}</span>
      </nav>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8 mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative flex-shrink-0">
            <img src={craftsman.avatar} alt={craftsman.name} className="w-24 h-24 rounded-2xl object-cover" />
            {craftsman.isAvailable ? (
              <Wifi className="absolute -bottom-1 -right-1 w-6 h-6 text-green-500 bg-white dark:bg-gray-800 rounded-full p-0.5" />
            ) : (
              <WifiOff className="absolute -bottom-1 -right-1 w-6 h-6 text-gray-400 bg-white dark:bg-gray-800 rounded-full p-0.5" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{craftsman.name}</h1>
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-brand-600 dark:text-brand-400 font-medium mb-3">{craftsman.profession}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{craftsman.rating} ({craftsman.reviewCount} تقييم)</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{craftsman.yearsExperience} سنوات خبرة</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{craftsman.location}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{craftsman.priceRange}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{craftsman.bio}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <a href={`tel:${craftsman.phone}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">
              <Phone className="w-5 h-5" /> اتصال
            </a>
            <a href={`https://wa.me/${craftsman.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors">
              <Send className="w-5 h-5" /> واتساب
            </a>
            <Link href={`/chat?user=${craftsman.id}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" /> محادثة
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {(["gallery", "services", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab === "gallery" ? "المعرض" : tab === "services" ? "الخدمات" : "التقييمات"}
          </button>
        ))}
      </div>

      {/* Gallery */}
      {activeTab === "gallery" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {craftsman.gallery.map((item) => (
            <div key={item.id} className="break-inside-avoid mb-4">
              <div className="group relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img src={item.url} alt={item.caption || ""} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                {item.caption && (
                  <div className="absolute bottom-0 right-0 left-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium">{item.caption}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Services */}
      {activeTab === "services" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {craftsman.services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{service.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
              </div>
              <span className="text-lg font-bold text-brand-600 dark:text-brand-400 whitespace-nowrap">{service.price} ر.س</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {craftsman.reviews.map((review) => (
            <div key={review.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{review.user}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 dark:text-gray-600"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
