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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
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
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Promotion Banner */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#e7f5e8] border-b border-[#25D366]/20"
      >
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between py-2.5 px-4 relative">
            {/* Left Side - Offer */}
            <div className="flex items-center space-x-3">
              <div className="shrink-0">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#25D366]/10 rounded-lg rotate-12 absolute" />
                  <div className="w-10 h-10 bg-[#25D366]/20 rounded-lg -rotate-6 absolute" />
                  <div className="w-10 h-10 bg-[#25D366]/30 rounded-lg flex items-center justify-center relative">
                    <svg className="w-5 h-5 text-[#075e54]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-[#075e54] text-sm font-medium flex items-center space-x-2">
                    <motion.span
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-[#25D366] text-white rounded-full px-3 py-1 font-bold tracking-wide shadow-sm whitespace-nowrap inline-block"
                    >
                      20% OFF
                    </motion.span>
                    <span>across all services</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Timer */}
            <div className="mt-2 sm:mt-0 flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#075e54]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold text-[#075e54] uppercase tracking-wide">Limited Time</span>
              </div>
              <CountdownTimer />
            </div>

            {/* Decorative Dots */}
            <div className="absolute left-0 top-0 h-full w-20 opacity-20" style={{ 
              backgroundImage: 'radial-gradient(circle, #25D366 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }} />
            <div className="absolute right-0 top-0 h-full w-20 opacity-20" style={{ 
              backgroundImage: 'radial-gradient(circle, #25D366 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }} />
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className={`w-full bg-[#075e54] shadow-md`}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex-shrink-0 relative">
                <div className="w-[80px] h-[80px] relative bg-white rounded-lg p-2 shadow-sm">
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
            <nav className="hidden lg:flex items-center space-x-8">
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
                      className="text-white hover:text-[#25D366] flex items-center font-medium transition-colors duration-200"
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
                      className="text-white hover:text-[#25D366] font-medium transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem: SubMenuItem, subIndex) => (
                          <motion.div
                            key={subItem.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              href={subItem.link}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
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

            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-2 text-white hover:bg-[#25D366] rounded-full transition-colors duration-200"
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
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Link
                  href={headerData.cta_button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden flex items-center px-6 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-white hover:text-[#075e54] transition-all duration-200 font-medium shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {headerData.cta_button.text}
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Mobile Theme Toggle */}
              {mounted && (
                <button
                  type="button"
                  className="p-2 text-white hover:bg-[#25D366] rounded-full transition-colors duration-200"
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

              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
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
            <div className="container mx-auto px-4 py-4">
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
                        className="w-full text-left py-3 text-white font-medium flex items-center justify-between"
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
                                className="block py-2.5 text-sm text-white/80 hover:text-white transition-colors duration-200"
                                onClick={toggleMenu}
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
                      className="block py-3 text-white font-medium hover:text-[#25D366] transition-colors duration-200"
                      onClick={toggleMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={headerData.cta_button.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center mt-4 px-6 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-white hover:text-[#075e54] transition-all duration-200 font-medium shadow-lg"
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
              </motion.div>
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
