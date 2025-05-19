"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.config";
import { getProcessData } from "@/lib/queries/process";

interface ProcessStep {
	title: string;
	description: string;
	icon: string;
}

interface ProcessData {
	section_title: string;
	steps: ProcessStep[];
	side_image: {
		src: string;
		alt: string;
	};
}

const ProcessStepCard = ({
	step,
	index,
}: {
	step: ProcessStep;
	index: number;
}) => {
	const [svgContent, setSvgContent] = useState<string>("");

	useEffect(() => {
		const fetchSvg = async () => {
			try {
				const response = await fetch(step.icon);
				const svgText = await response.text();
				const modifiedSvg = svgText.replace(
					"<svg",
					'<svg width="48" height="48" class="w-8 h-8"'
				);
				setSvgContent(modifiedSvg);
			} catch (error) {
				console.error("Error fetching SVG:", error);
			}
		};

		fetchSvg();
	}, [step.icon]);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.2 }}
			viewport={{ once: true }}
			className="relative flex flex-col bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
			{/* Step Number Badge */}
			<div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white font-bold shadow-lg text-sm md:text-base">
				{index + 1}
			</div>

			{/* Card Content */}
			<div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
				{/* Icon */}
				<motion.div
					initial={{ scale: 0.5, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
					viewport={{ once: true }}
					className="relative w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#25D366]/10 to-[#128C7E]/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
					<div
						className="text-[#25D366]"
						dangerouslySetInnerHTML={{ __html: svgContent }}
					/>
				</motion.div>
			</div>

			{/* Content */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
				viewport={{ once: true }}
				className="flex-1">
				<h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
					{step.title}
				</h3>
				<p className="text-sm md:text-base text-gray-600 leading-relaxed">
					{step.description}
				</p>
			</motion.div>
		</motion.div>
	);
};

const Process = () => {
	const [processData, setProcessData] = useState<ProcessData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await client.fetch(getProcessData);
				setProcessData(data);
			} catch (error) {
				console.error("Error fetching process data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading || !processData) {
		return (
			<div className="min-h-[600px] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#25D366]"></div>
			</div>
		);
	}

	return (
		<section className="relative py-16 md:py-20 lg:py-32 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 bg-[radial-gradient(#25D366_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.15]" />

			<div className="container mx-auto px-4">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="max-w-3xl mx-auto text-center mb-12 md:mb-16 lg:mb-24">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
						{processData.section_title}
					</h2>
					<div className="w-20 h-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] mx-auto rounded-full mb-6" />
					<p className="text-base md:text-lg text-gray-600">
						Our proven 4-step process ensures effective and
						long-lasting pest control solutions.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start">
					{/* Process Steps */}
					<div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 relative">
						{processData.steps.map((step, index) => (
							<ProcessStepCard
								key={step.title}
								step={step}
								index={index}
							/>
						))}
					</div>

					{/* Side Image */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="lg:col-span-2 mt-8 lg:mt-0">
						<div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
							{/* Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

							{/* Image */}
							<Image
								src={processData.side_image.src}
								alt={processData.side_image.alt}
								fill
								className="object-cover transition-transform duration-700 hover:scale-105"
								priority
							/>

							{/* Content Overlay */}
							<div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
								<h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
									Professional Service
								</h3>
								<p className="text-sm md:text-base text-gray-200 leading-relaxed">
									Our expert team follows this proven process
									to deliver outstanding results, ensuring
									your complete satisfaction.
								</p>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									viewport={{ once: true }}
									className="mt-4 md:mt-6 flex items-center gap-2">
									<div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
										<svg
											className="w-4 h-4 md:w-5 md:h-5 text-[#25D366]"
											fill="currentColor"
											viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<span className="text-sm md:text-lg">
										100% Satisfaction Guaranteed
									</span>
								</motion.div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Process;
