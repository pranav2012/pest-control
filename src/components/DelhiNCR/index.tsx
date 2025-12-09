"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Shield, Award, ThumbsUp, Users } from "lucide-react";

const stats = [
	{
		icon: Shield,
		value: "10+",
		label: "Years Experience",
	},
	{
		icon: Users,
		value: "10K+",
		label: "Happy Customers",
	},
	{
		icon: ThumbsUp,
		value: "4.9",
		label: "Google Rating",
	},
	{
		icon: MapPin,
		value: "100%",
		label: "Pan India Coverage",
	},
];

const features = [
	{
		title: "Government Approved Products",
		description:
			"We only use pesticides approved under the Indian Insecticide Act for safe and effective treatment.",
	},
	{
		title: "Eco-Friendly Solutions",
		description:
			"Our treatments are environmentally conscious and safe for children, elderly, and pets.",
	},
	{
		title: "Expert Team",
		description:
			"Highly trained professionals with extensive experience in pest control services.",
	},
	{
		title: "Comprehensive Coverage",
		description:
			"Complete pest control solutions for residential and commercial properties across Pan India.",
	},
];

const DelhiNCR = () => {
	return (
		<section
			className="relative py-20 overflow-hidden bg-gray-900"
			id="about-us">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(#B9FB4B_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.05]" />

			<div className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Best Pest Control Service Pan India
					</h2>
					<div className="w-20 h-1 bg-[#B9FB4B] mx-auto rounded-full mb-6" />
					<p className="text-lg text-gray-200">
						We use innovative and thorough strategies to deliver
						eco-friendly pest removal services to homeowners,
						companies, and municipalities across Pan India.
					</p>
				</motion.div>

				{/* Stats Grid */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="relative p-6 rounded-2xl bg-gray-800/50 shadow-lg shadow-black/20 text-center group hover:shadow-xl transition-shadow duration-300 border border-[#B9FB4B]/20">
							<div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#B9FB4B]/20 to-transparent" />
							<div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#B9FB4B]/20 to-transparent" />
							<div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-[#B9FB4B]/10 text-[#B9FB4B] group-hover:scale-110 transition-transform duration-300">
								<stat.icon className="w-6 h-6" />
							</div>
							<div className="text-3xl font-bold text-white mb-1">
								{stat.value}
							</div>
							<div className="text-sm text-gray-300">
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>

				{/* Content Grid */}
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left: Image */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="relative">
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
							<Image
								src="/images/hero2.png"
								alt="Professional Pest Control Service Pan India"
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
						</div>
						{/* Decorative Elements */}
						<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[#B9FB4B]/10 rounded-full blur-2xl" />
						<div className="absolute -right-4 -top-4 w-24 h-24 bg-[#B9FB4B]/10 rounded-full blur-2xl" />
					</motion.div>

					{/* Right: Features */}
					<div className="space-y-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
								viewport={{ once: true }}
								className="flex gap-4">
								<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#B9FB4B]/10 flex items-center justify-center">
									<Award className="w-6 h-6 text-[#B9FB4B]" />
								</div>
								<div>
									<h3 className="text-xl font-semibold text-white mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-300 leading-relaxed">
										{feature.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default DelhiNCR;
