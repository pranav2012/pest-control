"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFound = ({ error }: any) => {
	useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	return <NotFoundContent />;
};

const NotFoundContent = () => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-gradient-to-br from-[#2D4A0F] to-[#B9FB4B] text-white overflow-hidden relative">
			{/* Animated background particles */}
			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.1,
				}}></div>

			{/* Main content */}
			<motion.div
				className="relative z-10 text-center space-y-8"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}>
				{/* 404 Text */}
				<motion.h1
					className="text-8xl md:text-9xl font-bold font-poppins tracking-tighter text-white relative"
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}>
					404
					<motion.span
						className="absolute inset-0 text-white/20"
						animate={{
							x: [0, 2, -2, 0],
							y: [0, 1, -1, 0],
						}}
						transition={{
							duration: 0.3,
							repeat: Infinity,
							repeatType: "loop",
						}}>
						404
					</motion.span>
				</motion.h1>

				{/* Error Message */}
				<motion.div
					className="space-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.6 }}>
					<h2 className="text-2xl md:text-3xl font-semibold text-white">
						Oops, Page Not Found
					</h2>
					<p className="text-white/90 max-w-md mx-auto">
						The page you're looking for seems to have vanished.
						Let's get you back on track!
					</p>
				</motion.div>

				{/* Alert Icon */}
				<motion.div
					className="flex justify-center"
					initial={{ scale: 0, rotate: -10 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ delay: 0.5, duration: 0.5, type: "spring" }}>
					<div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
						<AlertTriangle className="h-12 w-12 text-white" />
					</div>
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className="flex flex-col sm:flex-row justify-center gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.7, duration: 0.6 }}>
					<button
						onClick={() => router.push("/")}
						className="group relative overflow-hidden bg-[#B9FB4B] rounded-xl px-6 py-3 text-base font-semibold transition-transform duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
						<Home className="h-5 w-5 mr-2" />
						Back to Home
					</button>
					<button
						onClick={() => router.back()}
						className="group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 text-base font-semibold transition-transform duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
						<ArrowLeft className="h-5 w-5 mr-2" />
						Go Back
					</button>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default NotFound;
