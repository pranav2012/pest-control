"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Service } from "@/types/services";
import {
	X as XIcon,
	ChevronRight,
	CheckCircle2,
	FileText,
	Shield,
	MapPin,
	Bug,
	Lightbulb,
	ClipboardList,
	Wrench,
	ListChecks,
	IndianRupee,
} from "lucide-react";
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
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
							<Dialog.Panel className="relative transform overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:rounded-2xl">
								{/* Close Button */}
								<button
									type="button"
									className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-[#B9FB4B] focus:ring-offset-2 focus:ring-offset-gray-900"
									onClick={onClose}>
									<span className="sr-only">Close</span>
									<XIcon
										className="h-5 w-5"
										aria-hidden="true"
									/>
								</button>

								<div className="flex flex-col">
									{/* Hero Image Section */}
									<div className="relative w-full h-48 sm:h-64 md:h-80">
										<Image
											src={service.image.src}
											alt={service.image.alt}
											fill
											className="object-cover"
											priority
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
										<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
											<div className="flex flex-col gap-4 text-left">
												<div>
													<Dialog.Title
														as="h3"
														className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
														{service.title}
													</Dialog.Title>
													<div className="h-1.5 w-24 bg-[#B9FB4B] mt-3 rounded-full" />
												</div>

												<div className="flex flex-wrap items-center gap-2">
													{service.details
														.warranty && (
														<div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
															<Shield className="h-3.5 w-3.5 text-[#B9FB4B]" />
															<span className="text-xs text-white/90">
																{
																	service
																		.details
																		.warranty
																}{" "}
																Warranty
															</span>
														</div>
													)}
													{service.details
														.service_area && (
														<div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5">
															<MapPin className="h-3.5 w-3.5 text-[#B9FB4B]" />
															<span className="text-xs text-white/90">
																{
																	service
																		.details
																		.service_area
																}
															</span>
														</div>
													)}
												</div>

												{service.details
													.pests_covered &&
													service.details
														.pests_covered.length >
														0 && (
														<div className="flex flex-wrap gap-1.5">
															{service.details.pests_covered.map(
																(pest) => (
																	<span
																		key={
																			pest
																		}
																		className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-white">
																		<Bug className="h-3 w-3 text-[#B9FB4B]" />
																		{pest}
																	</span>
																)
															)}
														</div>
													)}

												<p className="text-sm text-white/80 max-w-2xl">
													{service.description}
												</p>
											</div>
										</div>
									</div>

									{/* Content Section */}
									<div className="w-full">
										<div className="overflow-y-auto p-4 sm:p-6">
											<div className="grid gap-4 sm:gap-6">
												{/* Pest Facts */}
												{service.details.pest_facts &&
													service.details.pest_facts
														.length > 0 && (
														<div className="grid gap-3">
															{service.details.pest_facts.map(
																(
																	fact,
																	index
																) => (
																	<div
																		key={
																			fact.title
																		}
																		className={`relative overflow-hidden rounded-xl ${
																			index %
																				2 ===
																			0
																				? "bg-gradient-to-br from-[#B9FB4B]/10 to-transparent"
																				: "bg-gradient-to-br from-white/5 to-transparent"
																		} p-4 ring-1 ${
																			index %
																				2 ===
																			0
																				? "ring-[#B9FB4B]/20"
																				: "ring-white/10"
																		}`}>
																		<div className="flex flex-col gap-2">
																			<h5 className="text-base font-medium text-[#B9FB4B]">
																				{
																					fact.title
																				}
																			</h5>
																			<p className="text-sm text-white/90 leading-relaxed">
																				{
																					fact.content
																				}
																			</p>
																		</div>
																		{/* Decorative corner accent */}
																		<div
																			className={`absolute -right-8 -top-8 h-16 w-16 rounded-full ${
																				index %
																					2 ===
																				0
																					? "bg-[#B9FB4B]/10"
																					: "bg-white/5"
																			}`}
																		/>
																	</div>
																)
															)}
														</div>
													)}

												{/* Treatment Process */}
												<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
													<div className="flex items-center gap-2 mb-3">
														<div className="rounded-full bg-[#B9FB4B]/20 p-1.5">
															<ClipboardList className="h-4 w-4 text-[#B9FB4B]" />
														</div>
														<h4 className="text-base font-semibold text-white">
															Treatment Process
														</h4>
													</div>

													<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
														{service.details.treatment_process.map(
															(step, index) => (
																<div
																	key={step}
																	className="flex items-start gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/10">
																	<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#B9FB4B]/10 text-xs font-medium text-[#B9FB4B]">
																		{index +
																			1}
																	</div>
																	<p className="text-sm text-white/90">
																		{step}
																	</p>
																</div>
															)
														)}
													</div>
												</div>

												{/* Treatment Details */}
												{service.details
													.treatment_details &&
													service.details
														.treatment_details
														.length > 0 && (
														<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
															<div className="flex items-center gap-2 mb-4">
																<div className="rounded-full bg-[#B9FB4B]/20 p-1.5">
																	<Wrench className="h-4 w-4 text-[#B9FB4B]" />
																</div>
																<h4 className="text-base font-semibold text-white">
																	Treatment
																	Details
																</h4>
															</div>

															<div className="grid gap-3">
																{service.details.treatment_details.map(
																	(
																		detail
																	) => (
																		<div
																			key={
																				detail.title
																			}
																			className="flex gap-4 rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
																			{detail
																				.image
																				?.src && (
																				<div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
																					<Image
																						src={
																							detail
																								.image
																								.src
																						}
																						alt={
																							detail
																								.image
																								.alt ||
																							detail.title
																						}
																						fill
																						className="object-cover"
																						sizes="112px"
																					/>
																				</div>
																			)}
																			<div className="flex-1 min-w-0">
																				<h5 className="text-sm font-medium text-[#B9FB4B] mb-1">
																					{
																						detail.title
																					}
																				</h5>
																				<p className="text-xs text-white/90 leading-relaxed">
																					{
																						detail.description
																					}
																				</p>
																			</div>
																		</div>
																	)
																)}
															</div>
														</div>
													)}

												{/* Maintenance Contracts */}
												{service.details
													.maintenance_contracts &&
													service.details
														.maintenance_contracts
														.length > 0 && (
														<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
															<h4 className="text-base font-semibold text-[#B9FB4B] mb-2 sm:mb-3">
																Maintenance
																Contracts
															</h4>
															<div className="flex flex-col gap-4">
																{service.details.maintenance_contracts.map(
																	(
																		contract
																	) => (
																		<div
																			key={
																				contract.title
																			}
																			className="flex items-start gap-3 rounded-xl bg-gradient-to-br from-[#B9FB4B]/10 to-transparent p-4 ring-1 ring-[#B9FB4B]/20 shadow-sm">
																			<div className="mt-1 rounded-full bg-[#B9FB4B]/20 p-2 ring-1 ring-[#B9FB4B]/20 shrink-0">
																				<FileText className="h-5 w-5 text-[#B9FB4B]" />
																			</div>
																			<div className="flex-1 min-w-0">
																				<h5 className="text-base font-semibold text-white break-words">
																					{
																						contract.title
																					}
																				</h5>
																				<p className="text-sm text-white/90 mt-1 break-words">
																					{
																						contract.description
																					}
																				</p>
																			</div>
																		</div>
																	)
																)}
															</div>
															<p className="mt-3 text-xs text-white/60">
																* Contract terms
																and conditions
																apply. Contact
																us for detailed
																information.
															</p>
														</div>
													)}

												{/* Service Features */}
												<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
													<div className="flex items-center gap-2 mb-3">
														<div className="rounded-full bg-[#B9FB4B]/20 p-1.5">
															<ListChecks className="h-4 w-4 text-[#B9FB4B]" />
														</div>
														<h4 className="text-base font-semibold text-white">
															What's Included
														</h4>
													</div>

													<div className="flex flex-wrap gap-2">
														{service.details.service_features.map(
															(feature) => (
																<div
																	key={
																		feature
																	}
																	className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10">
																	<div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#B9FB4B]/10">
																		<CheckCircle2 className="h-2.5 w-2.5 text-[#B9FB4B]" />
																	</div>
																	<span className="text-xs text-white/90 whitespace-nowrap">
																		{
																			feature
																		}
																	</span>
																</div>
															)
														)}
													</div>
												</div>

												{/* Pricing */}
												{service.details.pricing &&
													service.details.pricing
														.length > 0 && (
														<div className="rounded-xl bg-[#B9FB4B]/5 p-3 sm:p-4 ring-1 ring-[#B9FB4B]/20">
															<div className="flex items-center gap-2 mb-3">
																<div className="rounded-full bg-[#B9FB4B]/20 p-1.5">
																	<IndianRupee className="h-4 w-4 text-[#B9FB4B]" />
																</div>
																<h4 className="text-base font-semibold text-white">
																	Pricing
																</h4>
															</div>

															<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
																{service.details.pricing.map(
																	(price) => (
																		<div
																			key={
																				price.type
																			}
																			className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-3 py-2 ring-1 ring-white/10">
																			<div>
																				<h5 className="text-xs font-medium text-white/90">
																					{
																						price.type
																					}
																				</h5>
																				<p className="text-base font-semibold text-[#B9FB4B]">
																					{
																						price.price
																					}
																				</p>
																			</div>
																			<div className="rounded-full bg-[#B9FB4B]/10 p-1.5 ring-1 ring-[#B9FB4B]/20">
																				<CheckCircle2 className="h-3.5 w-3.5 text-[#B9FB4B]" />
																			</div>
																		</div>
																	)
																)}
															</div>
															<p className="mt-2 text-xs text-white/60">
																* Prices may
																vary based on
																property size
																and specific
																requirements
															</p>
														</div>
													)}

												{/* CTA Button */}
												<a
													href={whatsappLink}
													target="_blank"
													rel="noopener noreferrer"
													className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#B9FB4B] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-gray-900 shadow-lg shadow-[#B9FB4B]/20 transition-all hover:bg-[#86B82D] hover:shadow-xl hover:shadow-[#B9FB4B]/30">
													<WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
													{service.details?.pricing &&
													service.details.pricing
														.length > 0
														? "Book Appointment"
														: "Get Free Quote"}
													<ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-0.5" />
												</a>
											</div>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default ServiceModal;
