import Link from "next/link";
import {
  Globe,
  MessageSquare,
  Camera,
  Play,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

const footerLinks = {
  "روابط سريعة": [
    { label: "الرئيسية", href: "/" },
    { label: "الفئات", href: "/categories" },
    { label: "نشر إعلان", href: "/post-ad" },
    { label: "المفضلة", href: "/favorites" },
    { label: "حسابي", href: "/profile" },
  ],
  الفئات: [
    { label: "عقارات", href: "/categories/real-estate" },
    { label: "سيارات", href: "/categories/cars" },
    { label: "إلكترونيات", href: "/categories/electronics" },
    { label: "أثاث ومنزل", href: "/categories/furniture" },
    { label: "خدمات", href: "/categories/services" },
  ],
  الدعم: [
    { label: "مركز المساعدة", href: "/help" },
    { label: "تواصل معنا", href: "/contact" },
    { label: "الأسئلة الشائعة", href: "/faq" },
    { label: "الشروط والأحكام", href: "/terms" },
    { label: "سياسة الخصوصية", href: "/privacy" },
  ],
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Facebook" },
  { icon: MessageSquare, href: "#", label: "Twitter" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Play, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 text-white font-bold text-xl shadow-lg shadow-brand-500/25">
                س
              </div>
              <div>
                <span className="text-xl font-bold text-white block leading-tight">
                  سوق بلدي
                </span>
                <span className="text-xs text-gray-400">Souq Baladi</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              سوق بلدي هو سوقك المحلي للبيع والشراء. ابحث عن آلاف الإعلانات في
              مدينتك واعثر على ما تحتاجه بأسعار مناسبة.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:+966500000000"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 50 000 0000</span>
              </a>
              <a
                href="mailto:support@souqbaladi.com"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                support@souqbaladi.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4" />
                الرياض، المملكة العربية السعودية
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-800 hover:bg-brand-500 text-gray-400 hover:text-white transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold text-sm mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white hover:pr-1 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-sm mb-1">
                اشترك في النشرة البريدية
              </h3>
              <p className="text-sm text-gray-400">
                تابع أحدث الإعلانات والعروض
              </p>
            </div>
            <form className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 sm:w-64 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-r-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-l-xl transition-colors"
              >
                اشترك
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} سوق بلدي. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/terms" className="hover:text-white transition-colors">
              الشروط
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              الخصوصية
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
