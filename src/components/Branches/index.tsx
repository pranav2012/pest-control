"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const branches = [
	{
		title: "South Delhi",
		address: "M5 Green Park Near Metro",
		coordinates: { lat: 28.5246378, lng: 77.1822044 },
	},
	{
		title: "West Delhi",
		address: "Dwarka sec 11, F 91, Andaaz building 1st floor",
		coordinates: { lat: 28.5912, lng: 77.0307 },
	},
	{
		title: "Rajouri Garden",
		address: "M/5 Akash cinema main road",
		coordinates: { lat: 28.6466, lng: 77.1185 },
	},
	{
		title: "North Delhi",
		address: "Majnu ka Tila",
		coordinates: { lat: 28.7001, lng: 77.229 },
	},
	{
		title: "East Delhi",
		address: "Naveen Shahdara, Maujpur",
		coordinates: { lat: 28.6823, lng: 77.2749 },
	},
	{
		title: "Gurgaon",
		address: "DLF phase 1 qutub plaza basement",
		coordinates: { lat: 28.4595, lng: 77.0266 },
	},
	{
		title: "Greater Noida",
		address: "Near Pari Chowk metro station",
		coordinates: { lat: 28.4744, lng: 77.504 },
	},
	{
		title: "Faridabad",
		address: "Sec 33 Awasthi colony gali no 2",
		coordinates: { lat: 28.4089, lng: 77.3178 },
	},
	{
		title: "Noida",
		address: "Sector 51",
		coordinates: { lat: 28.5785, lng: 77.3573 },
	},
];

const Branches = () => {
	const [hoveredBranch, setHoveredBranch] = useState<number | null>(null);

	return (
		<section
			className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 border-b border-gray-800"
			id="locate-us">do not change the structure just the colors
			<div className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto text-center mb-16">
					<h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
						Our Branches
					</h2>
					<div className="w-20 h-1 bg-[#B9FB4B] mx-auto rounded-full mb-6" />
					<p className="text-lg text-gray-300">
						Find the nearest Alpha Beneficent Care branch in your
						area for professional pest control services
					</p>
				</motion.div>

				{/* Map and Branches Grid */}
				<div className="bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-8 border border-[#B9FB4B]/20">
					<div className="flex flex-col md:grid md:grid-cols-3 gap-6">
						<div className="md:col-span-1 space-y-4">
							<h3 className="text-xl font-semibold text-[#B9FB4B] mb-4">
								Our Locations
							</h3>
							<div className="space-y-3 max-h-[300px] md:max-h-[500px] overflow-y-auto pr-2 md:pr-4 custom-scrollbar">
								{branches.map((branch, index) => (
									<div
										key={index}
										className="w-full p-3 sm:p-4 rounded-xl bg-gray-800/50 text-gray-200 hover:bg-gray-800 transition-colors duration-300 border border-[#B9FB4B]/10"
										onMouseEnter={() =>
											setHoveredBranch(index)
										}
										onMouseLeave={() =>
											setHoveredBranch(null)
										}>
										<div className="flex items-start gap-2 sm:gap-3">
											<i className="fas fa-map-marker-alt mt-1 text-[#B9FB4B] text-sm sm:text-base"></i>
											<div>
												<h4 className="font-semibold text-sm sm:text-base text-white">
													{branch.title}
												</h4>
												<p className="text-xs sm:text-sm mt-1 text-gray-300">
													{branch.address}
												</p>
												<a
													href={`https://maps.google.com/?q=${encodeURIComponent(`Alpha Beneficent Care ${branch.title} ${branch.address}`)}`}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#B9FB4B] hover:text-white mt-2 transition-colors duration-300">
													Get Directions
													<i className="fas fa-arrow-right text-[10px] sm:text-xs"></i>
												</a>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="md:col-span-2 h-[300px] md:h-[500px]">
							<iframe
								src="https://maps.google.com/maps?q=Alpha%20Beneficent%20Care%20Pvt.%20Ltd.%20Pest%20Control%20Services&t=m&z=11&output=embed&iwloc=near"
								title="Alpha Beneficent Care - All Branches"
								className="w-full h-full rounded-xl"
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Branches;
