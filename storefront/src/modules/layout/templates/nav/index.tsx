'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const megaMenu = [
    {
      heading: 'Вінілові платівки',
      links: [
        { label: 'Вінілові платівки', href: '/categories/vinyl' },
        { label: 'CD‑диски',        href: '/categories/cd' },
        { label: 'Готові комплекти', href: '/categories/sets' },
      ],
    },
    {
      heading: 'Огляд',
      links: [
        { label: 'Виконавець',         href: '/categories/artists' },
        { label: 'Жанри',              href: '/categories/genres' },
        { label: 'Нові надходження',   href: '/categories/new' },
        { label: 'Популярні товари',   href: '/categories/popular' },
        { label: 'Акційні пропозиції', href: '/categories/sale' },
        { label: 'Послуги',            href: '/categories/services' },
      ],
    },
  ]

  return (
    <header className="bg-[#34373F] text-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <a aria-label="На головну">
            <Image
              src="/logo.svg"
              alt="desadisc logo"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
          </a>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8 uppercase text-sm">
          {/* Mega-menu trigger */}
          <div className="relative group">
            <Link href="/shop">
              <a className="flex items-center hover:text-orange-400 whitespace-nowrap">
                Магазин <span className="ml-1 text-base">›</span>
              </a>
            </Link>

            {/* Mega-menu full-width panel */}
            <div className="absolute inset-x-0 top-full hidden group-hover:block z-10 bg-[#34373F]">
              <div className="container mx-auto px-6 py-8 grid grid-cols-3 gap-8">
                {megaMenu.map(section => (
                  <div key={section.heading}>
                    <h4 className="font-semibold mb-2">{section.heading}</h4>
                    <ul className="space-y-2">
                      {section.links.map(link => (
                        <li key={link.href}>
                          <Link href={link.href}>
                            <a className="block text-sm hover:text-orange-400 whitespace-nowrap">
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

          {/* Other navigation items */}
          <Link href="/vinyl"><a className="hover:text-gray-300">Вініл</a></Link>
          <Link href="/cd"><a className="hover:text-gray-300">CD</a></Link>
          <Link href="/genres"><a className="hover:text-gray-300">Жанри</a></Link>
          <Link href="/about"><a className="hover:text-gray-300">Про нас</a></Link>
          <Link href="/sale"><a className="hover:text-gray-300">Акції</a></Link>
        </nav>

        {/* Search / Login / Cart / Mobile toggle */}
        <div className="flex items-center space-x-4">
          {/* Search form */}
          <form className="hidden lg:flex items-center border border-[#585A5F] rounded-full w-[302px] h-[40px] overflow-hidden">
            <input
              type="text"
              placeholder="Пошук..."
              aria-label="Пошук по сайту"
              className="w-full h-full bg-[#34373F] placeholder-[#585A5F] text-sm focus:outline-none px-[10px] py-[6px]"
            />
            <button
              type="submit"
              aria-label="Почати пошук"
              className="flex items-center justify-center px-[10px] py-[6px]"
            >
              <Image
                src="/icons/search.svg"
                alt="icon search"
                width={18}
                height={18}
              />
            </button>
          </form>

          {/* Login link */}
          <Link href="/login">
            <a className="hidden lg:inline hover:text-gray-300 text-sm">Увійти</a>
          </Link>

          {/* Cart icon */}
          <Link href="/cart">
            <a className="relative hover:text-gray-300" aria-label="Перейти до кошика">
              <Image
                src="/icons/cart.svg"
                alt="icon cart"
                width={24}
                height={24}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">0</span>
            </a>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            <Image
              src={mobileOpen ? '/icons/close.svg' : '/icons/menu.svg'}
              alt="icon menu toggle"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-[#34373F]">
          <ul className="p-4 space-y-4">
            {megaMenu.map(section => (
              <li key={section.heading}>
                <p className="font-semibold">{section.heading}</p>
                <ul className="pl-4 mt-2 space-y-1">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <a className="block hover:text-orange-400">{link.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {/* repeat other items */}
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
