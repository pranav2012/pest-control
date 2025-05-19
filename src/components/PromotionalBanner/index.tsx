"use client";

import { motion } from "framer-motion";
import useCountdown from "@/hooks/useCountdown";

const CountdownTimer = () => {
	const { hours, minutes, seconds } = useCountdown();

	return (
		<div className="flex items-center space-x-1 sm:space-x-2 text-white font-mono">
			<div className="bg-white/20 backdrop-blur rounded px-1.5 py-0.5 sm:px-2 sm:py-1">
				<span className="font-bold text-xs sm:text-base">{hours}</span>
			</div>
			<span className="text-xs sm:text-base">:</span>
			<div className="bg-white/20 backdrop-blur rounded px-1.5 py-0.5 sm:px-2 sm:py-1">
				<span className="font-bold text-xs sm:text-base">
					{minutes}
				</span>
			</div>
			<span className="text-xs sm:text-base">:</span>
			<div className="bg-white/20 backdrop-blur rounded px-1.5 py-0.5 sm:px-2 sm:py-1">
				<span className="font-bold text-xs sm:text-base">
					{seconds}
				</span>
			</div>
		</div>
	);
};

const PromotionalBanner = () => {
	return (
		<motion.div
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full bg-[#1A2F06] border-b border-[#B9FB4B]/20 fixed top-0 z-50 h-[42px]">
			<div className="container mx-auto h-full">
				<div className="flex items-center justify-between h-full px-4 relative">
					{/* Left Side - Offer */}
					<div className="flex items-center space-x-2 sm:space-x-3">
						<div className="shrink-0 hidden sm:block">
							<div className="relative">
								<div className="w-8 h-8 bg-white/5 rounded-lg rotate-12 absolute" />
								<div className="w-8 h-8 bg-white/10 rounded-lg -rotate-6 absolute" />
								<div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center relative">
									<svg
										className="w-4 h-4 text-white"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
									</svg>
								</div>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex items-center space-x-2">
								<span className="text-white text-sm font-medium flex items-center space-x-2">
									<motion.span
										animate={{ scale: [1, 1.03, 1] }}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut",
										}}
										className="bg-[#B9FB4B] text-[#2D4A0F] rounded-full px-2 py-0.5 text-xs font-bold tracking-wide shadow-sm whitespace-nowrap inline-block">
										20% OFF
									</motion.span>
									<span className="text-xs whitespace-nowrap">
										across all services
									</span>
								</span>
							</div>
						</div>
					</div>

					{/* Right Side - Timer */}
					<div className="flex items-center space-x-2 sm:space-x-4">
						<div className="hidden sm:flex items-center space-x-2">
							<svg
								className="w-4 h-4 text-white"
								fill="currentColor"
								viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-xs font-semibold text-white uppercase tracking-wide">
								Limited Time
							</span>
						</div>
						<CountdownTimer />
					</div>

					{/* Decorative Dots */}
					<div
						className="absolute left-0 top-0 h-full w-20 opacity-10"
						style={{
							backgroundImage:
								"radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
							backgroundSize: "10px 10px",
						}}
					/>
					<div
						className="absolute right-0 top-0 h-full w-20 opacity-10"
						style={{
							backgroundImage:
								"radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
							backgroundSize: "10px 10px",
						}}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default PromotionalBanner;
