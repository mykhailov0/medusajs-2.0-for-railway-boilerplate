"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST!,
  apiKey: process.env.NEXT_PUBLIC_MEILI_KEY!,
});

const navItems = [
  {
    label: "МАГАЗИН",
    href: "/catalog",
    submenu: {
      columns: [
        [
          { label: "ВІНІЛОВІ ПЛАТІВКИ", href: "/catalog/vinyl" },
          { label: "CD-ДИСКИ", href: "/catalog/cd" },
          { label: "ГОТОВІ КОМПЛЕКТИ", href: "/catalog/kits" },
        ],
        [
          { label: "ВИКОНАВЕЦЬ", href: "/catalog/artist" },
          { label: "ЖАНРИ", href: "/catalog/genres" },
          { label: "НОВІ НАДХОДЖЕННЯ", href: "/catalog/new" },
          { label: "ПОПУЛЯРНІ ТОВАРИ", href: "/catalog/popular" },
          { label: "АКЦІЙНІ ПРОПОЗИЦІЇ", href: "/catalog/sale" },
          { label: "ПОСЛУГИ", href: "/catalog/services" },
        ],
      ],
    },
  },
  { label: "ВІНІЛ", href: "/vinyl" },
  { label: "CD", href: "/cd" },
  { label: "ЖАНРИ", href: "/genres" },
  { label: "ПРО НАС", href: "/about" },
  { label: "АКЦІЇ", href: "/promotions" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const index = client.index("products");
        const res = await index.search(query, { limit: 5 });
        setResults(res.hits as any[]);
      } catch (e) {
        console.error("Search error:", e);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <img src="/assets/logo-white.svg" alt="OdesaDisc" className="h-8 w-auto" />
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link href={item.href}>
                <a className="flex items-center hover:text-yellow-400 transition">
                  <span>{item.label}</span>
                  {item.submenu && (
                    <img src="/icons/chevron-down.svg" alt="" className="ml-1 h-4 w-4" />
                  )}
                </a>
              </Link>
              {item.submenu && openMenu === item.label && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
                  {item.submenu.columns.map((col, idx) => (
                    <ul key={idx} className="space-y-2">
                      {col.map((sub) => (
                        <li key={sub.label}>
                          <Link href={sub.href}>
                            <a className="block hover:text-yellow-400 transition">
                              {sub.label}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Search Field with MeiliSearch */}
          <div className="relative" ref={containerRef}>
            <img src="/icons/search.svg" alt="Пошук" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              className="bg-gray-800 placeholder-gray-500 rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
            />
            {showResults && results.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white text-black rounded-md shadow-lg max-h-60 overflow-auto z-20">
                {results.map((hit) => (
                  <Link href={`/product/${hit.id}`} key={hit.id}>
                    <a
                      onClick={() => setShowResults(false)}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      {hit.title}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* User and Cart Actions */}
          <Link href="/auth/login">
            <a className="flex items-center hover:text-yellow-400 transition">
              <img src="/icons/user.svg" alt="Увійти" className="h-5 w-5 mr-1" /> Увійти
            </a>
          </Link>
          <Link href="/cart">
            <a className="flex items-center hover:text-yellow-400 transition">
              <img src="/icons/cart.svg" alt="Кошик" className="h-5 w-5" />
            </a>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gray-900 text-white shadow-md p-4 space-y-4">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link href={item.href}>
                  <a className="flex justify-between items-center py-2 hover:text-yellow-400 transition">
                    {item.label}
                    {item.submenu && (
                      <img src="/icons/chevron-down.svg" alt="" className="h-4 w-4" />
                    )}
                  </a>
                </Link>
                {item.submenu && (
                  <div className="pl-4">
                    {item.submenu.columns.flat().map((sub) => (
                      <Link key={sub.label} href={sub.href}>
                        <a className="block py-1 hover:text-yellow-400 transition">{sub.label}</a>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-700 pt-4 space-y-2">
              <Link href="/auth/login"><a className="block py-2 hover:text-yellow-400">Увійти</a></Link>
              <Link href="/cart"><a className="block py-2 hover:text-yellow-400">Кошик</a></Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
