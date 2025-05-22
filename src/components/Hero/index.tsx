"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import heroData from "@/content/hero.json";
import { FormField, HeroData } from "@/types/hero";
import Image from "next/image";

const Hero = () => {
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// Construct the WhatsApp message
			const message =
				`Hi Alpha Beneficent Care,\n\nI would like to inquire about pest control services.\n\n` +
				`Here are my details:\n` +
				`👤 Name: ${formData.name || "Not provided"}\n` +
				`📞 Phone: ${formData.phone || "Not provided"}\n` +
				`🛠️ Service Required: ${formData.service || "Not provided"}\n\n` +
				`💬 Additional Information:\n${formData.message || "No additional information provided"}\n\n` +
				`Looking forward to hearing from you.\nThank you!`;

			// Encode the message for URL
			const encodedMessage = encodeURIComponent(message);

			// Get the WhatsApp number from the CTA buttons
			const whatsappButton = heroData.main_content.cta_buttons.find(
				(btn) => btn.type === "whatsapp"
			);
			const whatsappUrl =
				whatsappButton?.link ||
				"https://api.whatsapp.com/send?phone=918882002546&";

			// Construct the final URL
			const finalUrl = `${whatsappUrl}text=${encodedMessage}`;

			// Clear the form
			setFormData({});
			setSubmitStatus("success");

			// Open WhatsApp in a new tab
			window.open(finalUrl, "_blank");

			// Reset success message after 3 seconds
			setTimeout(() => {
				setSubmitStatus("idle");
			}, 3000);
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: FormField, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field.name]: value,
		}));
	};

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	};

	return (
		<section className="relative min-h-screen bg-gradient-to-br from-[#2D4A0F] to-[#B9FB4B] overflow-hidden py-8 lg:py-12">
			{/* Background Pattern */}
			<div
				className="absolute inset-0 pointer-events-none -z-10"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4' stroke='rgba(255,255,255,0.1)' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")`,
					opacity: 0.1,
				}}></div>

			<div className="container mx-auto px-4">
				<div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 pt-8">
					{/* Left Column: Content */}
					<motion.div
						initial="initial"
						animate="animate"
						className="flex-1 text-white max-w-2xl lg:max-w-none lg:flex-[0.6]">
						<motion.div variants={fadeInUp} className="mb-6">
							<div className="relative w-full max-w-[600px] h-[280px] mx-auto lg:mx-0">
								{/* First Image - Left */}
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									className="absolute left-0 top-1/2 -translate-y-1/2 w-[220px] h-[240px] rounded-2xl overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-all duration-300">
									<Image
										src="/images/hero1.png"
										alt="Pest Control Service"
										fill
										className="object-cover hover:scale-105 transition-transform duration-300"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#2D4A0F]/30 to-transparent"></div>
								</motion.div>

								{/* Second Image - Center */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.4 }}
									className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[220px] h-[260px] rounded-2xl overflow-hidden shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300 z-10">
									<Image
										src="/images/hero3.png"
										alt="Professional Pest Control"
										fill
										className="object-cover hover:scale-105 transition-transform duration-300"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#2D4A0F]/30 to-transparent"></div>
								</motion.div>

								{/* Third Image - Right */}
								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
									className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[240px] rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-all duration-300">
									<Image
										src="/images/hero2.png"
										alt="Professional Pest Control"
										fill
										className="object-cover hover:scale-105 transition-transform duration-300"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-[#2D4A0F]/30 to-transparent"></div>
								</motion.div>

								{/* Add subtle decorative elements */}
								<div className="absolute -left-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#B9FB4B]/10 rounded-full blur-2xl"></div>
								<div className="absolute -right-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-[#2D4A0F]/10 rounded-full blur-2xl"></div>
							</div>
						</motion.div>

						<motion.div
							variants={fadeInUp}
							className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-4">
							<span className="text-sm font-medium">
								🛡️ #1 Rated Pest Control Service
							</span>
						</motion.div>

						<motion.h1
							variants={fadeInUp}
							className="text-3xl lg:text-5xl font-bold mb-4 leading-tight">
							{heroData.main_content.title}
						</motion.h1>

						<motion.p
							variants={fadeInUp}
							className="text-lg text-white/90 mb-6 leading-relaxed max-w-2xl">
							{heroData.main_content.subtitle}
						</motion.p>

						<motion.div
							variants={fadeInUp}
							className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
							{heroData.main_content.cta_buttons.map((button) => (
								<Link
									key={button.type}
									href={button.link}
									target={
										button.type === "whatsapp"
											? "_blank"
											: undefined
									}
									rel={
										button.type === "whatsapp"
											? "noopener noreferrer"
											: undefined
									}
									className={`group relative overflow-hidden ${
										button.type === "whatsapp"
											? "bg-[#B9FB4B]"
											: "bg-white"
									} rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-transform duration-300 hover:scale-105 shadow-lg flex-1 sm:flex-initial`}>
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
									<span
										className={
											button.type === "whatsapp"
												? "text-gray-900"
												: "text-[#2D4A0F]"
										}>
										<div className="flex items-center justify-center gap-2">
											{button.type === "whatsapp" && (
												<svg
													className="w-4 h-4 sm:w-5 sm:h-5"
													fill="currentColor"
													viewBox="0 0 24 24">
													<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
												</svg>
											)}
											{button.type === "phone" && (
												<svg
													className="w-4 h-4 sm:w-5 sm:h-5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
													/>
												</svg>
											)}
											{button.text}
										</div>
									</span>
								</Link>
							))}
						</motion.div>

						{/* Trust Indicators */}
						<motion.div
							variants={fadeInUp}
							className="flex flex-wrap items-center gap-2 sm:gap-4">
							<Link
								href={heroData.main_content.google_reviews.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 transition-all duration-200">
								<div className="flex items-center gap-1">
									<svg
										className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-yellow-400"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<span className="text-xs sm:text-base font-semibold">
										{
											heroData.main_content.google_reviews
												.rating
										}
									</span>
								</div>
								<div className="h-3 sm:h-4 w-px bg-white/20"></div>
								<span className="text-[10px] sm:text-sm whitespace-nowrap">
									{
										heroData.main_content.google_reviews
											.total_reviews
									}{" "}
									Reviews
								</span>
								<svg
									className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5 hidden sm:block"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</Link>
							<div className="flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-1.5 bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
								<svg
									className="w-3.5 h-3.5 sm:w-5 sm:h-5"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
									<path
										fillRule="evenodd"
										d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="text-[10px] sm:text-sm whitespace-nowrap">
									Licensed & Insured
								</span>
							</div>
							<div className="hidden sm:flex items-center gap-1.5 bg-white/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
								<svg
									className="w-3.5 h-3.5 sm:w-5 sm:h-5"
									fill="currentColor"
									viewBox="0 0 20 20">
									<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
									<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
								</svg>
								<span className="text-[10px] sm:text-sm whitespace-nowrap">
									Same Day Service
								</span>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column: Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="w-full lg:w-[380px] shrink-0 lg:flex-[0.4] self-start">
						<div className="bg-gray-900 rounded-2xl shadow-2xl p-5">
							<h2 className="text-xl font-bold text-white mb-1">
								{heroData.contact_form.title}
							</h2>
							<p className="text-sm text-gray-300 mb-4">
								Get your free quote today!
							</p>

							<form
								onSubmit={handleSubmit}
								className="space-y-2.5">
								{heroData.contact_form.fields.map((field) => (
									<motion.div
										key={field.name}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
										className="space-y-1">
										<label
											htmlFor={field.name}
											className="block text-sm font-medium text-gray-300">
											{field.label}
											{field.required && (
												<span className="text-red-500 ml-1">
													*
												</span>
											)}
										</label>
										{field.type === "select" ? (
											<select
												id={field.name}
												name={field.name}
												required={field.required}
												className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#B9FB4B] focus:border-transparent transition-all duration-200"
												onChange={(e) =>
													handleInputChange(
														field,
														e.target.value
													)
												}
												value={
													formData[field.name] || ""
												}>
												<option value="">
													Select a service
												</option>
												{field.options?.map(
													(option) => (
														<option
															key={option}
															value={option}>
															{option}
														</option>
													)
												)}
											</select>
										) : field.type === "textarea" ? (
											<textarea
												id={field.name}
												name={field.name}
												required={field.required}
												placeholder={field.placeholder}
												className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#B9FB4B] focus:border-transparent transition-all duration-200 resize-none"
												rows={2}
												onChange={(e) =>
													handleInputChange(
														field,
														e.target.value
													)
												}
												value={
													formData[field.name] || ""
												}
											/>
										) : (
											<input
												type={field.type}
												id={field.name}
												name={field.name}
												required={field.required}
												placeholder={field.placeholder}
												pattern={field.pattern}
												className="block w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-[#B9FB4B] focus:border-transparent transition-all duration-200"
												onChange={(e) =>
													handleInputChange(
														field,
														e.target.value
													)
												}
												value={
													formData[field.name] || ""
												}
											/>
										)}
									</motion.div>
								))}
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									type="submit"
									disabled={isSubmitting}
									className={`w-full py-2.5 px-6 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl ${
										isSubmitting
											? "bg-gray-400 cursor-not-allowed"
											: "bg-[#B9FB4B] hover:bg-[#2D4A0F] text-gray-900 hover:text-white"
									}`}>
									{isSubmitting
										? "Sending..."
										: heroData.contact_form.submit_button
												.text}
								</motion.button>

								{/* Form Status Messages */}
								{submitStatus === "success" && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-green-400 text-sm mt-2 text-center">
										Thank you! We'll get back to you soon.
									</motion.div>
								)}
								{submitStatus === "error" && (
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										className="text-red-400 text-sm mt-2 text-center">
										Something went wrong. Please try again.
									</motion.div>
								)}
							</form>

							{/* Form Trust Indicators */}
							<div className="mt-4 pt-3 border-t border-gray-700">
								<div className="flex items-center gap-2 text-sm text-gray-300">
									<svg
										className="w-5 h-5 text-[#B9FB4B]"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<span>100% Satisfaction Guaranteed</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
