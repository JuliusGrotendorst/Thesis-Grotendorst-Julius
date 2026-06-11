"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "@/lib/constants";
import ServiceBar from "./ServiceBar";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ServiceBar />
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-6 h-16">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0" aria-label="Stadt Borken – Startseite">
              <Image
                src="/logo.png"
                alt="Stadt Borken – Kreisstadt"
                width={180}
                height={48}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop-Navigation */}
            <nav aria-label="Hauptnavigation" className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const active =
                    item.href !== "/" ? pathname.startsWith(item.href) : pathname === "/";
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`
                          relative block px-4 py-2 text-sm font-medium rounded transition-colors
                          ${active
                            ? "text-brand-accent"
                            : "text-neutral-700 hover:text-brand-accent hover:bg-neutral-50"
                          }
                        `}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                        {active && (
                          <span
                            className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent rounded-full"
                            aria-hidden
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Suche */}
            <label className="hidden lg:flex items-center gap-2 border border-neutral-300 rounded-md px-3 py-2 w-48 bg-white cursor-text hover:border-neutral-400 transition-colors">
              <svg width={15} height={15} viewBox="0 0 20 20" fill="none" stroke="#9AA3AE" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
                <circle cx={9} cy={9} r={6} />
                <path d="m13.5 13.5 4 4" />
              </svg>
              <input
                type="search"
                placeholder="Suche"
                aria-label="Suchbegriff eingeben"
                className="bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none flex-1"
              />
            </label>

            {/* Burger-Menü (mobil) */}
            <button
              className="lg:hidden ml-auto p-2 rounded hover:bg-neutral-100 transition-colors"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
                {menuOpen ? (
                  <>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobil-Menü */}
        {menuOpen && (
          <nav
            aria-label="Mobilnavigation"
            className="lg:hidden border-t border-neutral-100 bg-white"
          >
            <ul className="max-w-7xl mx-auto px-6 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href !== "/" ? pathname.startsWith(item.href) : pathname === "/";
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                        active
                          ? "text-brand-accent bg-red-50"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
