"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { MeiliSearch } from "meilisearch";

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

  const headerRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [submenuLeft, setSubmenuLeft] = useState<number>(0);

  // Fetch search results
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const hostEnv = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT!;
        const host = hostEnv.startsWith('http') ? hostEnv : `https://${hostEnv}`;
        const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!;
        const indexName = process.env.NEXT_PUBLIC_INDEX_NAME!;
        const client = new MeiliSearch({ host, apiKey });
        const index = client.index(indexName);
        const res = await index.search(query, { limit: 5 });
        setResults(res.hits as any[]);
      } catch (e) {
        console.error("Search error:", e);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Compute offset for dropdown under "МАГАЗИН"
  useEffect(() => {
    if (openMenu === "МАГАЗИН" && headerRef.current && shopRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect();
      const shopRect = shopRef.current.getBoundingClientRect();
      // account for header horizontal padding (px-6 => 24px)
      const offset = shopRect.left - headerRect.left - 24;
      setSubmenuLeft(offset);
    }
  }, [openMenu]);

  const currentSubmenu = navItems.find(i => i.label === openMenu)?.submenu;

  return (
    <header ref={headerRef} className="fixed top-0 w-full bg-[#34373F] text-white z-50">
      <div className="mx-auto max-w-[1440px] px-6 py-3 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-6">
          <Link href="/">
            <a className="flex items-center">
              <img src="/logo.svg" alt="OdesaDisc" className="h-8 w-auto" />
            </a>
          </Link>
          <nav className="hidden lg:flex items-center space-x-4">
            {navItems.map(item => (
              <div
                key={item.label}
                ref={item.label === "МАГАЗИН" ? shopRef : null}
                className="relative"
                onMouseEnter={() => item.submenu && setOpenMenu(item.label)}
                onMouseLeave={() => item.submenu && setOpenMenu(null)}
              >
                <Link href={item.href}>
                  <a className={`flex items-center px-2 py-1 rounded transition ${openMenu === item.label ? 'bg-[#DD6719]' : 'hover:bg-[#DD6719]'}`}> 
                    {item.label}
                    {item.submenu && <img src="/icons/chevron-down.svg" alt="" className="ml-1 h-4 w-4" />}
                  </a>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={containerRef}>
            <img src="/icons/search.svg" alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
            <input
              type="text"
              placeholder="Пошук"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              className="bg-[#34373F] placeholder-gray-500 rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#DD6719] transition-all w-32 focus:w-64"
            />
            {showResults && results.length > 0 && (
              <div className="absolute left-0 right-0 bg-white text-black rounded-md shadow-lg max-h-60 overflow-auto z-20">
                {results.map(hit => (
                  <Link href={`/products/${hit.handle}`} key={hit.id}>
                    <a onClick={() => setShowResults(false)} className="block px-4 py-2 hover:bg-gray-100 transition">
                      {hit.title}
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/auth/login"><a className="px-2 py-1 rounded transition hover:bg-[#DD6719] hover:text-white">Увійти</a></Link>
          <Link href="/cart"><a className="flex items-center px-2 py-1 rounded transition hover:bg-[#DD6719] hover:text-white"><img src="/icons/cart.svg" alt="" className="h-5 w-5"/></a></Link>
        </div>
      </div>

      {/* Dropdown */}
      {currentSubmenu && (
        <div
          className="absolute top-full left-0 right-0 bg-[#34373F]"
          onMouseEnter={() => setOpenMenu("МАГАЗИН")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <div className="relative mx-auto max-w-[1440px] px-6 py-6">
            <div
              className="absolute top-0 grid grid-cols-2 gap-8"
              style={{ left: submenuLeft }}
            >
              {currentSubmenu.columns.map((col, idx) => (
                <ul key={idx} className="space-y-3">
                  {col.map(sub => (
                    <li key={sub.label}>
                      <Link href={sub.href}>
                        <a className="block px-2 py-1 rounded transition hover:bg-[#DD6719] hover:text-white">
                          {sub.label}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
