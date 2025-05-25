import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getServices } from "@/lib/queries";
import { client } from "@/lib/sanity.config";
import {
	ClipboardList,
	Wrench,
	ListChecks,
	CheckCircle2,
	FileText,
	Shield,
	MapPin,
	Bug,
	IndianRupee,
	ChevronRight,
	ArrowLeft,
	Calendar,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/Services";
import { PortableText } from "@portabletext/react";

// Enable ISR with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false;

// Generate static params for all services
export async function generateStaticParams() {
	const services = await getServices();
	return services
		.map((service) => {
			if (!service.slug) {
				console.warn(`Service "${service.title}" is missing a slug`);
				return null;
			}
			return {
				slug: service.slug.toString(),
			};
		})
		.filter(Boolean);
}

export default async function ServicePage({ params }: any) {
	const service = await getServiceBySlug(params.slug);

	if (!service) return notFound();

	const whatsappMessage = encodeURIComponent(
		`Hi, I am interested in your ${service.title.toLowerCase()} services. Please provide more information.`
	);
	const whatsappLink = `https://api.whatsapp.com/send?phone=918882002546&text=${whatsappMessage}`;

	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
			{/* Hero Section */}
			<div className="relative">
				<div className="absolute inset-0">
					<Image
						src={service.image.src}
						alt={service.image.alt}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
					<div className="max-w-3xl">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
							{service.title}
						</h1>
						<div className="h-1.5 w-20 sm:w-24 bg-[#B9FB4B] mt-3 sm:mt-4 rounded-full" />
						<p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-2xl">
							{service.description}
						</p>
						{service.date && (
							<div className="mt-4 flex items-center gap-2 text-white/60">
								<Calendar className="h-4 w-4" />
								<span className="text-sm">
									Last updated:{" "}
									{new Date(service.date).toLocaleDateString(
										"en-US",
										{
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-6 sm:space-y-8">
						{/* About Service */}
						{service.about_service &&
							service.about_service.length > 0 && (
								<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
									<div className="flex items-center gap-3 mb-4 sm:mb-6">
										<div className="rounded-full bg-[#B9FB4B]/20 p-2">
											<FileText className="h-5 w-5 text-[#B9FB4B]" />
										</div>
										<h2 className="text-lg sm:text-xl font-semibold text-white">
											About This Service
										</h2>
									</div>
									<div className="prose prose-invert max-w-none">
										<PortableText
											value={service.about_service}
											components={{
												block: {
													h2: ({ children }) => (
														<h2 className="text-xl font-bold text-white mt-6 mb-3">
															{children}
														</h2>
													),
													h3: ({ children }) => (
														<h3 className="text-lg font-bold text-white mt-4 mb-2">
															{children}
														</h3>
													),
													normal: ({ children }) => (
														<p className="text-white/90 mb-4 leading-relaxed">
															{children}
														</p>
													),
													blockquote: ({
														children,
													}) => (
														<blockquote className="border-l-4 border-[#B9FB4B] pl-4 italic text-white/80 my-4 bg-white/5 p-4 rounded-lg">
															{children}
														</blockquote>
													),
												},
												marks: {
													strong: ({ children }) => (
														<strong className="font-bold text-white">
															{children}
														</strong>
													),
													em: ({ children }) => (
														<em className="italic text-white/90">
															{children}
														</em>
													),
													code: ({ children }) => (
														<code className="bg-white/10 px-1.5 py-0.5 rounded text-[#B9FB4B] font-mono text-sm">
															{children}
														</code>
													),
												},
												list: {
													bullet: ({ children }) => (
														<ul className="list-disc list-inside space-y-2 text-white/90 mb-4">
															{children}
														</ul>
													),
													number: ({ children }) => (
														<ol className="list-decimal list-inside space-y-2 text-white/90 mb-4">
															{children}
														</ol>
													),
												},
												types: {
													image: ({ value }) => (
														<div className="my-6">
															<Image
																src={
																	value.src
																		?.asset
																		?.url ||
																	value.asset
																		?.url
																}
																alt={
																	value.alt ||
																	""
																}
																width={800}
																height={400}
																className="rounded-lg ring-1 ring-white/10"
															/>
															{value.caption && (
																<p className="text-sm text-white/60 mt-2 text-center">
																	{
																		value.caption
																	}
																</p>
															)}
														</div>
													),
												},
											}}
										/>
									</div>
								</div>
							)}

						{/* Service Features */}
						<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
							<div className="flex items-center gap-3 mb-4 sm:mb-6">
								<div className="rounded-full bg-[#B9FB4B]/20 p-2">
									<ListChecks className="h-5 w-5 text-[#B9FB4B]" />
								</div>
								<h2 className="text-lg sm:text-xl font-semibold text-white">
									What's Included
								</h2>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
								{service.details.service_features.map(
									(feature: string) => (
										<div
											key={feature}
											className="flex items-center gap-2 sm:gap-3 rounded-xl bg-white/5 p-3 sm:p-4 ring-1 ring-white/10">
											<div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-[#B9FB4B]/10">
												<CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#B9FB4B]" />
											</div>
											<span className="text-sm text-white/90">
												{feature}
											</span>
										</div>
									)
								)}
							</div>
						</div>

						{/* Treatment Details */}
						{service.details.treatment_details &&
							service.details.treatment_details.length > 0 && (
								<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
									<div className="flex items-center gap-3 mb-4 sm:mb-6">
										<div className="rounded-full bg-[#B9FB4B]/20 p-2">
											<Wrench className="h-5 w-5 text-[#B9FB4B]" />
										</div>
										<h2 className="text-lg sm:text-xl font-semibold text-white">
											Treatment Details
										</h2>
									</div>
									<div className="grid gap-4 sm:gap-6">
										{service.details.treatment_details.map(
											(detail: any) => (
												<div
													key={detail.title}
													className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-xl bg-white/5 p-4 sm:p-6 ring-1 ring-white/10">
													{detail.image &&
														detail.image.src &&
														detail.image.src.startsWith(
															"http"
														) && (
															<div className="relative h-48 sm:h-64 w-full sm:w-64 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
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
																	sizes="(max-width: 640px) 100vw, 256px"
																	onError={(
																		e
																	) => {
																		const target =
																			e.target as HTMLImageElement;
																		target.style.display =
																			"none";
																	}}
																/>
															</div>
														)}
													<div className="flex-1 min-w-0">
														<h3 className="text-base sm:text-lg font-medium text-[#B9FB4B] mb-2">
															{detail.title}
														</h3>
														<p className="text-sm text-white/90 leading-relaxed">
															{detail.description}
														</p>
													</div>
												</div>
											)
										)}
									</div>
								</div>
							)}

						{/* Maintenance Contracts */}
						{service.details.maintenance_contracts &&
							service.details.maintenance_contracts.length >
								0 && (
								<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
									<div className="flex items-center gap-3 mb-4 sm:mb-6">
										<div className="rounded-full bg-[#B9FB4B]/20 p-2">
											<FileText className="h-5 w-5 text-[#B9FB4B]" />
										</div>
										<h2 className="text-lg sm:text-xl font-semibold text-white">
											Maintenance Contracts
										</h2>
									</div>
									<div className="grid gap-3 sm:gap-4">
										{service.details.maintenance_contracts.map(
											(contract: any) => (
												<div
													key={contract.title}
													className="rounded-xl bg-gradient-to-br from-[#B9FB4B]/10 to-transparent p-4 sm:p-6 ring-1 ring-[#B9FB4B]/20">
													<h3 className="text-base sm:text-lg font-semibold text-white mb-2">
														{contract.title}
													</h3>
													<p className="text-sm text-white/90">
														{contract.description}
													</p>
												</div>
											)
										)}
									</div>
									<p className="mt-3 sm:mt-4 text-sm text-white/60">
										* Contract terms and conditions apply.
										Contact us for detailed information.
									</p>
								</div>
							)}
					</div>

					{/* Sidebar */}
					<div className="space-y-6 sm:space-y-8">
						{/* Service Info Card */}
						{service.details.warranty && (
							<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
								<h2 className="text-lg font-semibold text-white mb-3 sm:mb-4">
									Service Information
								</h2>
								<div className="space-y-3 sm:space-y-4">
									<div className="flex items-center gap-3">
										<div className="rounded-full bg-[#B9FB4B]/20 p-2">
											<Shield className="h-4 w-4 text-[#B9FB4B]" />
										</div>
										<div>
											<p className="text-sm font-medium text-white/90">
												Warranty
											</p>
											<p className="text-sm text-white/60">
												{service.details.warranty}
											</p>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Pests Covered */}
						{service.details.pests_covered &&
							service.details.pests_covered.length > 0 && (
								<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
									<h2 className="text-lg font-semibold text-white mb-3 sm:mb-4">
										Pests Covered
									</h2>
									<div className="flex flex-wrap gap-2">
										{service.details.pests_covered.map(
											(pest: string) => (
												<span
													key={pest}
													className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm text-white/90 ring-1 ring-white/10">
													<Bug className="h-3.5 w-3.5 text-[#B9FB4B]" />
													{pest}
												</span>
											)
										)}
									</div>
								</div>
							)}

						{/* Pricing */}
						{service.details.pricing &&
							service.details.pricing.length > 0 && (
								<div className="rounded-2xl bg-gray-900/50 p-4 sm:p-6 ring-1 ring-white/10">
									<div className="flex items-center gap-3 mb-3 sm:mb-4">
										<div className="rounded-full bg-[#B9FB4B]/20 p-2">
											<IndianRupee className="h-4 w-4 text-[#B9FB4B]" />
										</div>
										<h2 className="text-lg font-semibold text-white">
											Pricing
										</h2>
									</div>
									<div className="space-y-2 sm:space-y-3">
										{service.details.pricing.map(
											(price: any) => (
												<div
													key={price.type}
													className="flex items-center justify-between gap-3 sm:gap-4 rounded-xl bg-white/5 p-3 sm:p-4 ring-1 ring-white/10">
													<div>
														<p className="text-sm font-medium text-white/90">
															{price.type}
														</p>
														<p className="text-base sm:text-lg font-semibold text-[#B9FB4B]">
															{price.price}
														</p>
													</div>
													<div className="rounded-full bg-[#B9FB4B]/10 p-2 ring-1 ring-[#B9FB4B]/20">
														<CheckCircle2 className="h-4 w-4 text-[#B9FB4B]" />
													</div>
												</div>
											)
										)}
									</div>
									<p className="mt-3 sm:mt-4 text-sm text-white/60">
										* Prices may vary based on property size
										and specific requirements
									</p>
								</div>
							)}

						{/* CTA Button */}
						<a
							href={whatsappLink}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 rounded-xl bg-[#B9FB4B] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-900 shadow-lg shadow-[#B9FB4B]/20 transition-all hover:bg-[#86B82D] hover:shadow-xl hover:shadow-[#B9FB4B]/30">
							<WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
							{service.details?.pricing &&
							service.details.pricing.length > 0
								? "Book Appointment"
								: "Get Free Quote"}
							<ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
