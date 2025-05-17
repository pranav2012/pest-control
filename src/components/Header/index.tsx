/* eslint-disable simple-import-sort/imports */

'use client';

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import headerData from '@/content/header.json'
import { HeaderData, MenuItem, SubMenuItem } from '@/types/header'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useState(() => setMounted(true))

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  return (
    <header className="w-full fixed top-0 z-50">
      {/* Promotion Banner */}
      <div className="w-full bg-[#075e54] text-white py-1.5 text-center text-sm font-medium tracking-wide backdrop-blur-sm bg-opacity-95">
        <p>{headerData.promotion_banner.text}</p>
      </div>

      {/* Main Header */}
      <div className="w-full bg-white dark:bg-gray-900 shadow-md backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative">
              <div className="w-[150px] h-[112px] relative">
                <Image
                  src={headerData.logo.src}
                  alt={headerData.logo.alt}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="mix-blend-darken dark:mix-blend-screen dark:invert dark:opacity-90 transition-opacity duration-200"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {headerData.navigation.main_menu.map((item: MenuItem) => (
                <div key={item.title} className="relative group">
                  {item.submenu ? (
                    <button
                      className="text-gray-700 dark:text-gray-300 hover:text-[#25D366] flex items-center font-medium transition-colors duration-200"
                      onClick={() => toggleDropdown(item.title)}
                    >
                      {item.title}
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.link}
                      className="text-gray-700 dark:text-gray-300 hover:text-[#25D366] font-medium transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border dark:border-gray-700">
                      <div className="py-2">
                        {item.submenu.map((subItem: SubMenuItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.link}
                            className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              {/* WhatsApp Button */}
              <Link
                href={headerData.cta_button.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-[#075e54] transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {headerData.cta_button.text}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}

              <button
                className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="container mx-auto px-4 py-2">
            {headerData.navigation.main_menu.map((item: MenuItem) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div>
                    <button
                      className="w-full text-left py-3 text-gray-700 dark:text-gray-300 font-medium flex items-center justify-between"
                      onClick={() => toggleDropdown(item.title)}
                    >
                      {item.title}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeDropdown === item.title && (
                      <div className="pl-4 border-l-2 border-[#25D366] ml-2">
                        {item.submenu.map((subItem: SubMenuItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.link}
                            className="block py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-[#25D366] transition-colors duration-200"
                            onClick={toggleMenu}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.link}
                    className="block py-3 text-gray-700 dark:text-gray-300 font-medium hover:text-[#25D366] transition-colors duration-200"
                    onClick={toggleMenu}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href={headerData.cta_button.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mt-4 mb-2 px-6 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-[#075e54] transition-colors duration-200 font-medium shadow-lg"
              onClick={toggleMenu}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {headerData.cta_button.text}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
