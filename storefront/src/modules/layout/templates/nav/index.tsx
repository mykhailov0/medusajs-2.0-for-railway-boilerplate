'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const megaMenu = [
    {
      heading: 'Вінілові платівки',
      links: [
        { label: 'Вінілові платівки', href: '/shop/vinyl' },
        { label: 'CD‑диски',        href: '/shop/cd' },
        { label: 'Готові комплекти', href: '/shop/sets' },
      ],
    },
    {
      heading: 'Огляд',
      links: [
        { label: 'Виконавець',        href: '/shop/artists' },
        { label: 'Жанри',             href: '/shop/genres' },
        { label: 'Нові надходження',  href: '/shop/new' },
        { label: 'Популярні товари',  href: '/shop/popular' },
        { label: 'Акційні пропозиції',href: '/shop/sale' },
        { label: 'Послуги',           href: '/shop/services' },
      ],
    },
  ]

  return (
    <header className="bg-gray-800 text-white">
      {/* верхній рядок */}
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/"><a className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        </a></Link>

        {/* Десктопна навігація */}
        <nav className="hidden md:flex items-center space-x-8 uppercase text-sm">
          {/* Mega‑menu */}
          <div className="relative group">
            <Link href="/shop">
              <a className="flex items-center hover:text-orange-400 group-hover:text-orange-400">
                Магазин <ChevronRight className="ml-1 h-4 w-4 text-current" />
              </a>
            </Link>

            {/* Підменю */}
            <div className="pointer-events-none absolute left-0 top-full w-full bg-gray-800 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
              <div className="container mx-auto grid grid-cols-3 gap-8 px-6 py-8">
                {megaMenu.map((section) => (
                  <div key={section.heading}>
                    <h4 className="font-semibold mb-2">{section.heading}</h4>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <a className="block text-sm hover:text-orange-400">
                              {link.label}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Інші пункти */}
          <Link href="/vinyl"><a className="hover:text-gray-300">Вініл</a></Link>
          <Link href="/cd"><a className="hover:text-gray-300">CD</a></Link>
          <Link href="/genres"><a className="hover:text-gray-300">Жанри</a></Link>
          <Link href="/about"><a className="hover:text-gray-300">Про нас</a></Link>
          <Link href="/sale"><a className="hover:text-gray-300">Акції</a></Link>
        </nav>

        {/* Пошук, Вхід, Кошик, Гамбургер */}
        <div className="flex items-center space-x-4">
          <form className="hidden lg:flex items-center border border-gray-700 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Пошук..."
              className="px-3 py-1 bg-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button type="submit" className="px-3">
            <img src="/search.svg" alt="Logo" className="h-8 w-auto" />
            </button>
          </form>

          <Link href="/login"><a className="hidden lg:inline hover:text-gray-300 text-sm">Увійти</a></Link>

          <Link href="/cart">
            <a className="relative text-2xl hover:text-gray-300">
            <img src="/cart.svg" alt="Корзина" className="h-8 w-auto" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">0</span>
            </a>
          </Link>

          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {mobileOpen && (
        <nav className="md:hidden bg-gray-800">
          <ul className="p-4 space-y-4">
            {megaMenu.map((section) => (
              <li key={section.heading}>
                <p className="font-semibold">{section.heading}</p>
                <ul className="pl-4 mt-2 space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <a className="block hover:text-orange-400">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li><Link href="/vinyl"><a className="block hover:text-gray-300">Вініл</a></Link></li>
            <li><Link href="/cd"><a className="block hover:text-gray-300">CD</a></Link></li>
            <li><Link href="/genres"><a className="block hover:text-gray-300">Жанри</a></Link></li>
            <li><Link href="/about"><a className="block hover:text-gray-300">Про нас</a></Link></li>
            <li><Link href="/sale"><a className="block hover:text-gray-300">Акції</a></Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
