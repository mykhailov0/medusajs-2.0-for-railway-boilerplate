// storefront/src/components/Header.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  ChevronRightIcon
} from '@heroicons/react/outline'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const megaMenu = [
    {
      heading: 'Вінілові платівки',
      links: [
        { label: 'Поп‑музика', href: '/shop/vinyl/pop' },
        { label: 'Рок', href: '/shop/vinyl/rock' },
        { label: 'Джаз', href: '/shop/vinyl/jazz' },
      ],
    },
    {
      heading: 'CD‑диски',
      links: [
        { label: 'Класика', href: '/shop/cd/classical' },
        { label: 'Метал', href: '/shop/cd/metal' },
        { label: 'Новинки', href: '/shop/cd/new' },
      ],
    },
    {
      heading: 'Огляд',
      links: [
        { label: 'Жанри', href: '/shop/genres' },
        { label: 'Нові надходження', href: '/shop/new' },
        { label: 'Акції', href: '/shop/sale' },
      ],
    },
  ]

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/"><a><img src="/logo.svg" alt="Logo" className="h-8"/></a></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="group relative">
            <Link href="/shop">
              <a className="flex items-center hover:text-gray-300">
                Магазин <ChevronRightIcon className="h-4 w-4 ml-1"/>
              </a>
            </Link>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                            absolute left-0 top-full mt-2 w-screen max-w-4xl bg-gray-800 p-6
                            grid grid-cols-3 gap-6 transition-all">
              {megaMenu.map(section => (
                <div key={section.heading}>
                  <h4 className="font-semibold mb-2">{section.heading}</h4>
                  <ul className="space-y-1">
                    {section.links.map(link => (
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
          <Link href="/vinyl"><a className="hover:text-gray-300">Вініл</a></Link>
          <Link href="/cd"><a className="hover:text-gray-300">CD</a></Link>
          <Link href="/genres"><a className="hover:text-gray-300">Жанри</a></Link>
          <Link href="/about"><a className="hover:text-gray-300">Про нас</a></Link>
          <Link href="/sale"><a className="hover:text-gray-300">Акції</a></Link>
        </nav>

        {/* Search & cart */}
        <div className="flex items-center space-x-4">
          <form className="hidden lg:flex items-center border border-gray-700 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Пошук..."
              className="px-3 py-1 bg-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button type="submit" className="px-3">
              <SearchIcon className="h-5 w-5 text-gray-400"/>
            </button>
          </form>
          <Link href="/cart">
            <a className="relative">
              <ShoppingCartIcon className="h-6 w-6 hover:text-gray-300"/>
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">0</span>
            </a>
          </Link>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <XIcon className="h-6 w-6"/> : <MenuIcon className="h-6 w-6"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-gray-800">
          <ul className="flex flex-col space-y-2 p-4">
            {megaMenu.map(section => (
              <li key={section.heading}>
                <span className="font-semibold">{section.heading}</span>
                <ul className="pl-4 space-y-1">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <a className="block py-1 hover:text-gray-300">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li><Link href="/vinyl"><a className="block py-1">Вініл</a></Link></li>
            <li><Link href="/cd"><a className="block py-1">CD</a></Link></li>
            <li><Link href="/genres"><a className="block py-1">Жанри</a></Link></li>
            <li><Link href="/about"><a className="block py-1">Про нас</a></Link></li>
            <li><Link href="/sale"><a className="block py-1">Акції</a></Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}
