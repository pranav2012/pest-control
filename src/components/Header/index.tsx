/* eslint-disable simple-import-sort/imports */

'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import headerData from '@/content/header.json'
import { HeaderData, MenuItem, SubMenuItem } from '@/types/header'
import useCountdown from '@/hooks/useCountdown'
import { handleSectionNavigation } from '@/utils/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('/#')) {
      e.preventDefault()
      const targetId = link.replace('/#', '')
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    // Close mobile menu and dropdown when any link is clicked
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Close any open dropdown when toggling menu
    setActiveDropdown(null)
  }

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  const fadeIn = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }

  return (
    <motion.header 
      initial="initial"
      animate="animate"
      className={`w-full fixed top-[42px] z-40 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Main Header */}
      <div className={`w-full bg-[#075e54] shadow-md`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[70px]"> {/* Reduced from 84px */}
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex-shrink-0 relative">
                <div className="w-[60px] h-[60px] relative bg-white rounded-lg p-1.5"> {/* Reduced size and padding */}
                  <div className="absolute inset-0 bg-white rounded-lg" />
                  <Image
                    src={headerData.logo.src}
                    alt={headerData.logo.alt}
                    fill
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
                    className="transition-opacity duration-200 p-1"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6"> {/* Reduced space-x-8 to space-x-6 */}
              {headerData.navigation.main_menu.map((item: MenuItem, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {item.submenu ? (
                    <button
                      className="text-white hover:text-[#25D366] flex items-center font-medium transition-colors duration-200 text-sm" // Added text-sm
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
                      onClick={(e) => item.link.startsWith('/#') && handleSectionNavigation(e, item.link, () => setIsMenuOpen(false))}
                      className="text-white hover:text-[#25D366] font-medium transition-colors duration-200 text-sm" // Added text-sm
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-1"> {/* Reduced py-2 to py-1 */}
                        {item.submenu.map((subItem: SubMenuItem, subIndex) => (
                          <motion.div
                            key={subItem.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              href={subItem.link}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                            >
                              {subItem.title}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center"> {/* Removed space-x-3 since we only have one item now */}
              {/* Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-1.5 text-white hover:bg-[#25D366] rounded-full transition-colors duration-200"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-1.5 text-white hover:bg-[#25D366] rounded-full transition-colors duration-200" // Reduced padding
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" /> // Reduced size
                  ) : (
                    <Moon className="h-4 w-4" /> // Reduced size
                  )}
                </button>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-1.5 text-white hover:bg-white/10 rounded-full transition-colors duration-200" // Reduced padding
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" /> // Reduced size
                ) : (
                  <Menu className="h-5 w-5" /> // Reduced size
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#075e54] border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-3">
              {headerData.navigation.main_menu.map((item: MenuItem, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.submenu ? (
                    <div>
                      <button
                        className="w-full text-left py-2.5 text-white font-medium flex items-center justify-between text-sm"
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
                        <div className="pl-4 border-l border-white/20 ml-2">
                          {item.submenu.map((subItem: SubMenuItem, subIndex) => (
                            <motion.div
                              key={subItem.title}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              <Link
                                href={subItem.link}
                                className="block py-2 text-sm text-white/80 hover:text-white transition-colors duration-200"
                                onClick={(e) => handleNavigation(e, subItem.link)}
                              >
                                {subItem.title}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.link}
                      className="block py-2.5 text-white font-medium hover:text-[#25D366] transition-colors duration-200 text-sm"
                      onClick={(e) => handleNavigation(e, item.link)}
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

const CountdownTimer = () => {
  const { hours, minutes, seconds } = useCountdown();
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1.5">
        <TimeUnit value={hours} />
        <span className="text-[#25D366] font-bold">:</span>
        <TimeUnit value={minutes} />
        <span className="text-[#25D366] font-bold">:</span>
        <TimeUnit value={seconds} />
      </div>
    </div>
  );
};

const TimeUnit = ({ value }: { value: string }) => (
  <div className="bg-white rounded-lg px-2 py-1 min-w-[2rem] text-center shadow-sm border border-[#25D366]/20">
    <span className="font-mono font-bold text-sm text-[#075e54]">{value}</span>
  </div>
);

export default Header
