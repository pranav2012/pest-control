/* eslint-disable simple-import-sort/imports */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import headerData from "@/content/header.json";
import { MenuItem, SubMenuItem } from "@/types/header";
import useCountdown from "@/hooks/useCountdown";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [domainUrl, setDomainUrl] = useState("");

	// After mounting, we have access to the theme
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);

		// Get domain URL
		if (typeof window !== "undefined") {
			const url = window.location.origin;
			setDomainUrl(url);
		}

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const getFullUrl = (link: string) => {
		if (link.startsWith("/#")) {
			return `${domainUrl}${link}`;
		}
		return link;
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
		// Close any open dropdown when toggling menu
		setActiveDropdown(null);
	};

	const toggleDropdown = (title: string) => {
		setActiveDropdown(activeDropdown === title ? null : title);
	};

	const fadeIn = {
		initial: { opacity: 0, y: -20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.3 },
	};

	return (
		<motion.header
			initial="initial"
			animate="animate"
			className={`w-full fixed top-[42px] z-40 transition-all duration-300 ${
				isScrolled ? "shadow-lg" : ""
			}`}>
			{/* Main Header */}
			<div className={`w-full bg-white shadow-md`}>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-[70px]">
						{/* Logo */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}>
							<Link href="/" className="flex-shrink-0 relative">
								<div className="w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] relative">
									<Image
										src={headerData.logo.src}
										alt={headerData.logo.alt}
										fill
										style={{
											objectFit: "contain",
										}}
										className="transition-opacity duration-200"
										priority
									/>
								</div>
							</Link>
						</motion.div>

						{/* Desktop Navigation */}
						<nav className="hidden lg:flex items-center space-x-6">
							{headerData.navigation.main_menu.map(
								(item: MenuItem, index) => (
									<motion.div
										key={item.title}
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										className="relative group">
										{item.submenu ? (
											<button
												className="text-[#2D4A0F] hover:text-[#86B82D] flex items-center font-medium transition-colors duration-200 text-sm"
												onClick={() =>
													toggleDropdown(item.title)
												}>
												{item.title}
												<svg
													className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
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
												href={getFullUrl(item.link)}
												className="text-[#2D4A0F] hover:text-[#86B82D] font-medium transition-colors duration-200 text-sm"
												onClick={() =>
													setIsMenuOpen(false)
												}>
												{item.title}
											</Link>
										)}

										{/* Dropdown Menu */}
										{item.submenu && (
											<div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
												<div className="py-1">
													{item.submenu.map(
														(
															subItem: SubMenuItem,
															subIndex
														) => (
															<motion.div
																key={
																	subItem.title
																}
																initial={{
																	opacity: 0,
																	x: -20,
																}}
																animate={{
																	opacity: 1,
																	x: 0,
																}}
																transition={{
																	delay:
																		subIndex *
																		0.05,
																}}>
																<Link
																	href={getFullUrl(
																		subItem.link
																	)}
																	className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#B9FB4B] hover:text-white transition-colors duration-200"
																	onClick={() => {
																		setIsMenuOpen(
																			false
																		);
																		setActiveDropdown(
																			null
																		);
																	}}>
																	{
																		subItem.title
																	}
																</Link>
															</motion.div>
														)
													)}
												</div>
											</div>
										)}
									</motion.div>
								)
							)}
						</nav>

						{/* Mobile Menu Button */}
						<div className="flex lg:hidden items-center">
							<motion.button
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								className="p-1.5 text-[#2D4A0F] hover:bg-gray-100 rounded-full transition-colors duration-200"
								onClick={toggleMenu}
								aria-label="Toggle menu">
								{isMenuOpen ? (
									<X className="h-5 w-5" />
								) : (
									<Menu className="h-5 w-5" />
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
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="lg:hidden bg-white border-t border-gray-100">
						<div className="container mx-auto px-4 py-3">
							{headerData.navigation.main_menu.map(
								(item: MenuItem, index) => (
									<motion.div
										key={item.title}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}>
										{item.submenu ? (
											<div>
												<button
													className="w-full text-left py-2.5 text-[#2D4A0F] font-medium flex items-center justify-between text-sm"
													onClick={() =>
														toggleDropdown(
															item.title
														)
													}>
													{item.title}
													<svg
														className={`w-4 h-4 transition-transform duration-200 ${
															activeDropdown ===
															item.title
																? "rotate-180"
																: ""
														}`}
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M19 9l-7 7-7-7"
														/>
													</svg>
												</button>
												{activeDropdown ===
													item.title && (
													<div className="pl-4 border-l border-gray-200 ml-2">
														{item.submenu.map(
															(
																subItem: SubMenuItem,
																subIndex
															) => (
																<motion.div
																	key={
																		subItem.title
																	}
																	initial={{
																		opacity: 0,
																		x: -20,
																	}}
																	animate={{
																		opacity: 1,
																		x: 0,
																	}}
																	transition={{
																		delay:
																			subIndex *
																			0.05,
																	}}>
																	<Link
																		href={getFullUrl(
																			subItem.link
																		)}
																		className="block py-2 text-sm text-gray-600 hover:text-[#86B82D] transition-colors duration-200"
																		onClick={() => {
																			setIsMenuOpen(
																				false
																			);
																			setActiveDropdown(
																				null
																			);
																		}}>
																		{
																			subItem.title
																		}
																	</Link>
																</motion.div>
															)
														)}
													</div>
												)}
											</div>
										) : (
											<Link
												href={getFullUrl(item.link)}
												className="block py-2.5 text-[#2D4A0F] font-medium hover:text-[#86B82D] transition-colors duration-200 text-sm"
												onClick={() =>
													setIsMenuOpen(false)
												}>
												{item.title}
											</Link>
										)}
									</motion.div>
								)
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.header>
	);
};

const CountdownTimer = () => {
	const { hours, minutes, seconds } = useCountdown();

	return (
		<div className="flex items-center space-x-2">
			<div className="flex items-center space-x-1.5">
				<TimeUnit value={hours} />
				<span className="text-[#B9FB4B] font-bold">:</span>
				<TimeUnit value={minutes} />
				<span className="text-[#B9FB4B] font-bold">:</span>
				<TimeUnit value={seconds} />
			</div>
		</div>
	);
};

const TimeUnit = ({ value }: { value: string }) => (
	<div className="bg-white rounded-lg px-2 py-1 min-w-[2rem] text-center shadow-sm border border-[#B9FB4B]/20">
		<span className="font-mono font-bold text-sm text-[#2D4A0F]">
			{value}
		</span>
	</div>
);

export default Header;
