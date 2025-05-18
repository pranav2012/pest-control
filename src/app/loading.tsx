"use client";

import { motion } from "framer-motion";

export default function Loading() {
	return (
		<div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
			<div className="relative">
				{/* Outer rotating ring */}
				<motion.div
					className="w-16 h-16 rounded-full border-4 border-[#25D366]/20"
					animate={{
						rotate: 360,
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "linear",
					}}>
					{/* Inner spinning gradient circle */}
					<motion.div
						className="absolute inset-1 rounded-full bg-gradient-to-r from-[#075e54] to-[#25D366]"
						animate={{
							rotate: [0, 360],
							scale: [0.8, 1, 0.8],
						}}
						transition={{
							rotate: {
								duration: 1.5,
								repeat: Infinity,
								ease: "linear",
							},
							scale: {
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							},
						}}
					/>
				</motion.div>

				{/* Pulsing background effect */}
				<motion.div
					className="absolute inset-0 rounded-full bg-[#25D366]/10"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.1, 0.3],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</div>
		</div>
	);
}
