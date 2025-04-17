// store/components/Header.jsx
import Link from 'next/link'
import { useState } from 'react'
import { SearchIcon, ShoppingCartIcon, ChevronRightIcon } from '@heroicons/react/outline'

export default function Header() {
  const [open, setOpen] = useState(false)

  const megaMenu = [ /* … ваша структура */ ]

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Логотип */}
        <Link href="/"><a><img src="/logo.svg" className="h-8" /></a></Link>

        {/* Mega‑menu для “Магазин” */}
        <nav className="hidden md:flex items-center space-x-6">
          <div className="group relative">
            <Link href="/shop"><a className="flex items-center hover:text-gray-300">
              Магазин <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a></Link>

            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                            absolute left-0 top-full mt-2 w-screen max-w-4xl bg-gray-800 p-6 shadow-lg transition-all">
              <div className="grid grid-cols-4 gap-6">
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
          </div>

          {/* Інші пункти */}
          <Link href="/vinyl"><a className="hover:text-gray-300">Вініл</a></Link>
          <Link href="/cd"><a className="hover:text-gray-300">CD</a></Link>
          {/* … */}
        </nav>

        {/* Пошук і кошик */}
        <div className="flex items-center space-x-4">
          <form className="hidden lg:flex items-center border border-gray-700 rounded">
            <input type="text" placeholder="Пошук..." className="px-3 py-1 bg-gray-800 focus:outline-none" />
            <button><SearchIcon className="h-5 w-5 text-gray-400" /></button>
          </form>
          <Link href="/cart">
            <a className="relative"><ShoppingCartIcon className="h-6 w-6 hover:text-gray-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">3</span>
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}
