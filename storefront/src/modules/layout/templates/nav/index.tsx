'use client'

import React, { useState } from 'react'
import Link from 'next/link'

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
        { label: 'Виконавець',         href: '/shop/artists' },
        { label: 'Жанри',              href: '/shop/genres' },
        { label: 'Нові надходження',   href: '/shop/new' },
        { label: 'Популярні товари',   href: '/shop/popular' },
        { label: 'Акційні пропозиції', href: '/shop/sale' },
        { label: 'Послуги',            href: '/shop/services' },
      ],
    },
  ]

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/"><a><img src="/logo.svg" alt="Logo" className="h-8"/></a></Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-8 uppercase text-sm">
          {/* Mega‑menu trigger */}
          <div className="relative group">
            <Link href="/shop">
              <a className="flex items-center hover:text-orange-400">
                Магазин 
                <img
                  src="/icons/chevron-right.svg"
                  alt="›"
                  className="ml-1 h-4 w-4"
                />
              </a>
            </Link>
            {/* Mega‑menu panel */}
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

          {/* Other links */}
          <Link href="/vinyl"><a className="hover:text-gray-300">Вініл</a></Link>
          <Link href="/cd"><a className="hover:text-gray-300">CD</a></Link>
          <Link href="/genres"><a className="hover:text-gray-300">Жанри</a></Link>
          <Link href="/about"><a className="hover:text-gray-300">Про нас</a></Link>
          <Link href="/sale"><a className="hover:text-gray-300">Акції</a></Link>
        </nav>

        {/* Search / Login / Cart / Mobile toggle */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <form className="hidden lg:flex items-center border border-[#585A5F] rounded-full w-[302px] h-[40px] overflow-hidden">
  <input
    type="text"
    placeholder="Пошук..."
    className="
      w-full h-full
      bg-gray-800
      placeholder-[#585A5F]
      text-sm
      focus:outline-none
      px-[10px]
      py-[6px]
    "
  />
  <button type="submit" className="flex items-center justify-center px-[10px] py-[6px]">
    <img src="/icons/search.svg" alt="Search" className="h-[18px] w-[18px]" />
  </button>
</form>

          {/* Login */}
          <Link href="/login">
            <a className="hidden lg:inline hover:text-gray-300 text-sm">Увійти</a>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <a className="relative hover:text-gray-300">
              <img src="/icons/cart.svg" alt="Cart" className="h-6 w-6"/>
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
                0
              </span>
            </a>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <img
              src={mobileOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              alt="Toggle menu"
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
            {/* repeat other links for mobile */}
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
