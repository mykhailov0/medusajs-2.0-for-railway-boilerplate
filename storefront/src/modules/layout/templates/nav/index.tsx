"use client";   

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Каталог", href: "/catalog", submenu: [
      { label: "Рок", href: "/genre/rock" },
      { label: "Джаз", href: "/genre/jazz" },
      { label: "Електронна", href: "/genre/electronic" },
    ]
  },
  { label: "Про нас", href: "/about" },
  { label: "Контакти", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a>
            <img src="/assets/logo.svg" alt="OdesaDisc Logo" className="h-8" />
          </a>
        </Link>
        <nav className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link href={item.href}>
                <a
                  onMouseEnter={() => item.submenu && setIsOpen(true)}
                  onMouseLeave={() => item.submenu && setIsOpen(false)}
                  className="flex items-center hover:text-blue-600 transition"
                >
                  {item.label}
                  {item.submenu && <span className="ml-1">▼</span>}
                </a>
              </Link>
              {item.submenu && isOpen && (
                <div
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                  className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2"
                >
                  {item.submenu.map((sub) => (
                    <Link key={sub.label} href={sub.href}>
                      <a className="block px-4 py-2 hover:bg-gray-100 transition">
                        {sub.label}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <a className="flex items-center hover:text-blue-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293-2.586M7 13l1.293 2.586M17 13l1.293-2.586M17 13l-1.293 2.586M6 21a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </a>
          </Link>
          <Link href="/auth/login">
            <a className="px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Увійти
            </a>
          </Link>
        </div>
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
            <nav className="flex flex-col space-y-2 px-6">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <a className="block py-2 hover:text-blue-600 transition">{item.label}</a>
                </Link>
              ))}
              <Link href="/cart">
                <a className="block py-2 hover:text-blue-600 transition">Кошик</a>
              </Link>
              <Link href="/auth/login">
                <a className="block py-2 hover:text-blue-600 transition">Увійти</a>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
