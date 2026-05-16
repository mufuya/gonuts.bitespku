import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/products";
import { Clock, MapPin, MapPinPlus, Nut } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-bark)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/logo-clean.svg"
                alt="GoNuts Bites Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-black text-xl tracking-tight">
              GoNuts Bites
            </span>
          </div>
          <p className="text-white/80 text-sm leading-relaxed max-w-md">
            Inovasi camilan sehat bergaya spring roll dengan cita rasa
            gado-gado khas Indonesia. Segar, praktis, Instagramable.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">
            Beranda
          </Link>
          <Link href="/produk" className="text-white/70 hover:text-white transition-colors text-sm">
            Produk
          </Link>
          <Link href="/layanan" className="text-white/70 hover:text-white transition-colors text-sm">
            Layanan & FAQ
          </Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70 mb-10">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={SITE_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            {SITE_CONFIG.instagramHandle}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white/50" />
            {SITE_CONFIG.location}
          </span>
          {/* <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-white/50" />
            {SITE_CONFIG.operationalHours}
          </span> */}
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/40 text-xs">
          <p>© {year} GoNuts Bites. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Nut className="w-3.5 h-3.5" strokeWidth={2} /> in Pekanbaru, Riau
          </p>
        </div>
      </div>
    </footer>
  );
}
