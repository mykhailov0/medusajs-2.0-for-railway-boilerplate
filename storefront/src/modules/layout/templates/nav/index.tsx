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
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [submenuLeft, setSubmenuLeft] = useState<number>(0);

  // Пошук за допомогою MeiliSearch
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const hostEnv = process.env.NEXT_PUBLIC_SEARCH_ENDPOINT!;
        const host = hostEnv.startsWith("http") ? hostEnv : `https://${hostEnv}`;
        const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY!;
        const indexName = process.env.NEXT_PUBLIC_INDEX_NAME!;
        const client = new MeiliSearch({ host, apiKey });
        const index = client.index(indexName);
        const res = await index.search(query, { limit: 5 });
        setResults(res.hits as any[]);
      } catch {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Закрити дропдаун при кліку поза
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Позиціювання меню під "МАГАЗИН"
  useEffect(() => {
    if (openMenu === "МАГАЗИН" && wrapperRef.current && shopRef.current) {
      const wrapRect = wrapperRef.current.getBoundingClientRect();
      const shopRect = shopRef.current.getBoundingClientRect();
      setSubmenuLeft(shopRect.left - wrapRect.left - 32);
    }
  }, [openMenu]);

  const currentSubmenu = navItems.find(i => i.label === openMenu)?.submenu;

  return (
    <header
      className="fixed top-0 w-full bg-[#34373F] text-white z-50 h-[100px]"
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div
        ref={wrapperRef}
        className="mx-auto max-w-[1440px] px-6 h-full flex items-center justify-between relative"
      >
        {/* Лого та навігація */}
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
                ref={item.submenu ? shopRef : null}
                onMouseEnter={() => item.submenu && setOpenMenu(item.label)}
              >
                <Link href={item.href}>
                  <a
                    className={`flex items-center px-2 py-1 transition font-normal text-[14px] leading-[100%] uppercase ${
                      openMenu === item.label ? "text-[#DD6719]" : "hover:text-[#DD6719]"
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <img
                        src="/icons/chevron-down.svg"
                        alt=""
                        className="ml-1 h-4 w-4"
                      />
                    )}
                  </a>
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* Пошук та кнопки */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={containerRef}>
            <img
              src="/icons/search.svg"
              alt="search"
              className="absolute left-[10px] top-1/2 transform -translate-y-1/2 h-5 w-5"
            />
            <input
              type="text"
              placeholder="Пошук"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              className={`bg-[#34373F] rounded-full w-[302px] h-[40px] border border-[#585A5F] pl-[36px] pr-3 py-[10px] focus:bg-[#34373F] focus:outline-none focus:ring-2 focus:ring-[#DD6719] transition ${
                query ? "placeholder-white" : "placeholder-gray-500"
              }`}
            />
            {showResults && results.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg overflow-auto z-20 mt-1">
                {results.map(hit => (
                  <Link href={`/products/${hit.handle}`} key={hit.id}>
                    <a className="flex items-center px-4 py-2 hover:bg-gray-100 transition">
                      <img
                        src={hit.thumbnail}
                        alt={hit.title}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{hit.title}</p>
                        <p className="text-sm text-gray-600">{hit.artist}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/auth/login">
            <a className="px-2 py-1 rounded transition font-normal text-[14px] leading-[100%] uppercase hover:text-[#DD6719]">
              Увійти
            </a>
          </Link>
          <Link href="/cart">
            <a className="flex items-center px-2 py-1 rounded transition hover:text-[#DD6719]">
              <img src="/icons/cart.svg" alt="" className="h-5 w-5" />
            </a>
          </Link>
        </div>
      </div>

      {/* Випадаюче меню */}
      {currentSubmenu && (
        <div className="absolute top-full left-0 right-0 bg-[#34373F]">
          <div className="mx-auto max-w-[1440px] px-6 py-6">
            <div className="grid grid-cols-2 gap-x-[6px] gap-y-[18px]" style={{ marginLeft: submenuLeft }}>
              {currentSubmenu.columns.map((col, idx) => (
                <ul key={idx} className="space-y-3">
                  {col.map(sub => (
                    <li key={sub.label}>
                      <Link href={sub.href}>
                        <a className="block px-2 py-1 font-normal text-[14px] leading-[100%] uppercase transition hover:text-[#DD6719]">
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
