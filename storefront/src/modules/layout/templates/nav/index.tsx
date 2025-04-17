'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const megaMenu = [
    {
      heading: 'Категорії',
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
    <header className="bg-gray-900 text-gray-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center">
            <img src="/logo.svg" alt="desadisc logo" className="h-10 w-auto" />
          </a>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase">
          {/* Mega-menu trigger */}
          <div className="relative group">
            <Link href="/shop">
              <a className="flex items-center hover:text-white">
                Магазин <ChevronRight className="ml-1 h-4 w-4 text-current" />
              </a>
            </Link>
            {/* Mega-menu dropdown */}
            <div className="pointer-events-none absolute left-0 top-full w-full bg-gray-900 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
              <div className="container mx-auto grid grid-cols-2 gap-8 px-6 py-6">
                {megaMenu.map((section) => (
                  <div key={section.heading}>
                    <h4 className="text-white font-semibold mb-2">{section.heading}</h4>
                    <ul className="space-y-1">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <a className="block hover:text-white">{link.label}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Static links */}
          <Link href="/vinyl">
            <a className="hover:text-white">Вініл</a>
          </Link>
          <Link href="/cd">
            <a className="hover:text-white">CD</a>
          </Link>
          <Link href="/genres">
            <a className="hover:text-white">Жанри</a>
          </Link>
          <Link href="/about">
            <a className="hover:text-white">Про нас</a>
          </Link>
          <Link href="/sale">
            <a className="hover:text-white">Акції</a>
          </Link>
        </nav>

        {/* Search / Login / Cart */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Пошук..."
              className="bg-gray-800 placeholder-gray-500 text-sm text-white
                         border border-gray-700 rounded-full py-1 pl-4 pr-10 focus:outline-none"
            />
            <button
              type="submit"
              className="relative -ml-8 text-gray-500 hover:text-white"
            >
              <img src="/search.svg" alt="Пошук" className="h-4 w-4" />
            </button>
          </form>

          {/* Login */}
          <Link href="/login">
            <a className="hidden md:inline text-sm hover:text-white">Увійти</a>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <a className="relative text-xl hover:text-white">
              <img src="/cart.svg" alt="Кошик" className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-1">
                0
              </span>
            </a>
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-gray-900">
          <ul className="p-4 space-y-4 uppercase text-sm font-medium">
            {/* Mega sections */}
            {megaMenu.map((section) => (
              <li key={section.heading}>
                <p className="text-white mb-2">{section.heading}</p>
                <ul className="pl-4 space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <a className="hover:text-white">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            {/* Static links */}
            <li>
              <Link href="/vinyl"><a className="hover:text-white">Вініл</a></Link>
            </li>
            <li>
              <Link href="/cd"><a className="hover:text-white">CD</a></Link>
            </li>
            <li>
              <Link href="/genres"><a className="hover:text-white">Жанри</a></Link>
            </li>
            <li>
              <Link href="/about"><a className="hover:text-white">Про нас</a></Link>
            </li>
            <li>
              <Link href="/sale"><a className="hover:text-white">Акції</a></Link>
            </li>
            <li>
              <Link href="/login"><a className="hover:text-white">Увійти</a></Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
