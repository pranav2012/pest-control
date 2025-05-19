"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Service } from "@/types/services";
import { X as XIcon } from "lucide-react";
import { WhatsAppIcon } from "./index";

interface ServiceModalProps {
	service: Service | null;
	isOpen: boolean;
	onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
	if (!service) return null;

	const whatsappMessage = encodeURIComponent(
		`Hi, I am interested in your ${service.title.toLowerCase()} services. Please provide more information.`
	);
	const whatsappLink = `https://api.whatsapp.com/send?phone=918882002546&text=${whatsappMessage}`;

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-2 sm:p-4">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="relative w-full max-h-[90vh] sm:max-h-[85vh] max-w-2xl transform overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2D4A0F] to-[#1A2F06] shadow-2xl transition-all mx-2 sm:mx-4">
								{/* Header with Image */}
								<div className="relative h-40 sm:h-56 w-full">
									<Image
										src={service.image.src}
										alt={service.image.alt}
										fill
										className="object-cover"
										priority
									/>
									{/* Enhanced gradient overlay for better text readability */}
									<div className="absolute inset-0 bg-gradient-to-t from-[#1A2F06] via-[#1A2F06]/70 to-transparent" />

									{/* Close Button */}
									<button
										onClick={onClose}
										className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-full bg-[#B9FB4B] p-1.5 sm:p-2 transition-all hover:bg-[#86B82D]">
										<XIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1A2F06]" />
									</button>

									{/* Title Overlay with improved text contrast */}
									<div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12 sm:p-6 text-white">
										<Dialog.Title
											as="h3"
											className="text-lg sm:text-2xl font-bold text-white drop-shadow-sm">
											{service.title}
										</Dialog.Title>
										<p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-white/95 drop-shadow-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
											{service.description}
										</p>
									</div>
								</div>

								{/* Scrollable Content */}
								<div className="max-h-[calc(90vh-10rem)] sm:max-h-[calc(85vh-14rem)] overflow-y-auto px-4 py-5 sm:p-6">
									<div className="grid gap-4 sm:gap-6">
										{/* Pests/Areas Covered */}
										<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
											<h4 className="text-sm sm:text-base font-semibold text-[#B9FB4B]">
												{service.details.pests_covered
													? "Pests Covered"
													: "Areas Covered"}
											</h4>
											<div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
												{(
													service.details
														.pests_covered ||
													service.details
														.areas_covered
												)?.map((item) => (
													<span
														key={item}
														className="inline-flex items-center rounded-lg bg-[#B9FB4B]/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white ring-1 ring-[#B9FB4B]/20">
														{item}
													</span>
												))}
											</div>
										</div>

										{/* Service Features */}
										<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
											<h4 className="text-sm sm:text-base font-semibold text-[#B9FB4B]">
												Service Features
											</h4>
											<div className="mt-2 sm:mt-3 grid gap-1.5 sm:gap-2 sm:grid-cols-2">
												{service.details.service_features.map(
													(feature) => (
														<div
															key={feature}
															className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
															<div className="h-1.5 w-1.5 rounded-full bg-[#B9FB4B]" />
															<span>
																{feature}
															</span>
														</div>
													)
												)}
											</div>
										</div>

										{/* Treatment Process */}
										<div>
											<h4 className="text-sm sm:text-base font-semibold text-[#B9FB4B]">
												Treatment Process
											</h4>
											<div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3">
												{service.details.treatment_process.map(
													(step, index) => (
														<div
															key={step}
															className="flex items-start gap-3 sm:gap-4 rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
															<span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B9FB4B] to-[#86B82D] text-xs sm:text-sm font-medium text-[#1A2F06]">
																{index + 1}
															</span>
															<p className="text-xs sm:text-sm text-white/80">
																{step}
															</p>
														</div>
													)
												)}
											</div>
										</div>

										{/* Service Info & CTA */}
										<div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
											<div className="space-y-0.5 sm:space-y-1 mb-3 sm:mb-0">
												<p className="text-xs sm:text-sm text-white/60">
													Service Area
												</p>
												<p className="text-sm sm:text-base font-medium text-white">
													{
														service.details
															.service_area
													}
												</p>
											</div>
											<a
												href={whatsappLink}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B9FB4B] hover:bg-[#86B82D] px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base text-[#1A2F06] font-medium shadow-lg shadow-[#B9FB4B]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#B9FB4B]/30">
												<WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
												Get Free Quote
											</a>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default ServiceModal;
