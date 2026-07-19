"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Image as ImageIcon,
  MapPin,
  Phone,
  Send,
  Check,
} from "lucide-react";
import { CATEGORIES, CITIES } from "@/lib/constants";

const steps = [
  { id: 1, title: "اختر الفئة" },
  { id: 2, title: "التفاصيل" },
  { id: 3, title: "الصور" },
  { id: 4, title: "الموقع والتواصل" },
  { id: 5, title: "المراجعة والنشر" },
];

export default function PostPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(false);
  const [condition, setCondition] = useState("new");
  const [images, setImages] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 5));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const addMockImage = () => {
    if (images.length < 10) {
      setImages([...images, `https://picsum.photos/seed/${Date.now()}/400/300`]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">الرئيسية</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-gray-900 dark:text-white font-medium">نشر إعلان</span>
      </nav>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        نشر إعلان جديد
      </motion.h1>

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= step.id ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              <span className={`text-xs hidden sm:block ${currentStep >= step.id ? "text-brand-600 dark:text-brand-400 font-medium" : "text-gray-400"}`}>{step.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 ${currentStep > step.id ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 p-6 sm:p-8"
        >
          {/* Step 1: Category */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">اختر الفئة</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.slug); setSelectedSubcategory(""); }}
                    className={`p-4 rounded-xl border-2 text-right transition-all ${selectedCategory === cat.slug ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}`}
                  >
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{cat.nameAr}</span>
                  </button>
                ))}
              </div>
              {selectedCategory && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">اختر الفئة الفرعية</h3>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.find((c) => c.slug === selectedCategory)?.subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubcategory(sub.slug)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedSubcategory === sub.slug ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                      >
                        {sub.nameAr}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">تفاصيل الإعلان</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العنوان</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الإعلان" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الوصف</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="وصف تفصيلي للمنتج..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">السعر (ر.س)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الحالة</label>
                  <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="new">جديد</option>
                    <option value="like_new">كالجديد</option>
                    <option value="used">مستعمل</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">السعر قابل للتفاوض</span>
              </label>
            </div>
          )}

          {/* Step 3: Images */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">صور الإعلان</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(i)} className="absolute top-2 left-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {images.length < 10 && (
                  <button onClick={addMockImage} className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-brand-500 dark:hover:border-brand-500 flex flex-col items-center justify-center gap-2 transition-colors">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-400">إضافة صورة</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400">يمكنك إضافة حتى 10 صور. الصورة الأولى ستكون الصورة الرئيسية.</p>
            </div>
          )}

          {/* Step 4: Location & Contact */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">الموقع ومعلومات التواصل</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="">اختر المدينة</option>
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.slug}>{c.nameAr}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">العنوان التفصيلي</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="حي، شارع..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الجوال</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+966 5X XXX XXXX" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الواتساب (اختياري)</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="+966 5X XXX XXXX" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">مراجعة ونشر</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">الفئة</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCategory || "غير محدد"}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">العنوان</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{title || "غير محدد"}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">السعر</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{price ? `${Number(price).toLocaleString()} ر.س` : "غير محدد"}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">المدينة</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{city || "غير محدد"}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <span className="text-xs text-gray-400 block mb-1">الصور</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{images.length} صور</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-500/10 rounded-xl">
                <p className="text-sm text-green-700 dark:text-green-400">جاهز للنشر! سيتم مراجعة إعلانك قبل الظهور.</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={prevStep} disabled={currentStep === 1} className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <ChevronRight className="w-5 h-5" /> السابق
        </button>
        {currentStep < 5 ? (
          <button onClick={nextStep} className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition-colors">
            التالي <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors">
            <Send className="w-5 h-5" /> نشر الإعلان
          </button>
        )}
      </div>
    </div>
  );
}
