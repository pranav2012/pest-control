"use client";

import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/services";

export const WhatsAppIcon = ({
	className = "h-4 w-4",
}: {
	className?: string;
}) => (
	<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
	</svg>
);

const ServiceCard = ({
	service,
	index,
}: {
	service: Service;
	index: number;
}) => {
	const whatsappMessage = encodeURIComponent(
		`Hi, I am interested in your ${service.title.toLowerCase()} services. Please provide more information.`
	);
	const fullWhatsappLink = `https://wa.me/+918882002546?text=${whatsappMessage}`;

	return (
		<div className="relative flex flex-col bg-gray-900/80 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full border border-[#B9FB4B]/20">
			<Link
				href={`/services/${service.slug}`}
				className="flex flex-col h-full"
				style={{ textDecoration: "none" }}>
				{/* Image Container */}
				<div className="relative h-48 overflow-hidden sm:h-56">
					<Image
						src={service.image.src}
						alt={service.image.alt}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
				</div>

				{/* Content Container */}
				<div className="relative space-y-4 p-5">
					{/* Title */}
					<h3 className="text-xl font-semibold text-white">
						{service.title}
					</h3>

					{/* Description */}
					<p className="text-sm leading-relaxed text-gray-300">
						{service.description}
					</p>

					{/* Tags */}
					<div className="flex flex-wrap gap-2">
						{(
							service.details.pests_covered ||
							service.details.areas_covered
						)
							?.slice(0, 3)
							.map((item) => (
								<span
									key={item}
									className="relative inline-flex items-center rounded-lg bg-[#B9FB4B]/10 px-3 py-1 text-xs font-medium text-[#B9FB4B] ring-1 ring-[#B9FB4B]/20">
									{item}
								</span>
							))}
					</div>

					{/* Action Buttons */}
					<div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
						<span className="group/btn relative text-sm font-medium text-[#B9FB4B] transition-colors hover:text-white">
							Learn More
						</span>
					</div>
				</div>
			</Link>
			<a
				href={fullWhatsappLink}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#25D366]/30"
				onClick={(e) => e.stopPropagation()}>
				<WhatsAppIcon />
			</a>
		</div>
	);
};

const Services = ({ initialData }: { initialData: any }) => {
	if (!initialData) return null;

	return (
		<section
			id="services"
			className="relative bg-gray-900 py-20 scroll-mt-24">
			{/* Subtle Pattern Background */}
			<div className="absolute inset-0 bg-[radial-gradient(#B9FB4B_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.05]" />

			<div className="container relative mx-auto px-4">
				{/* Section Header */}
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<h2 className="mb-6 text-4xl font-bold text-white [text-wrap:balance] md:text-5xl">
						{initialData.section_title}
					</h2>
					<div className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#B9FB4B] to-[#86B82D]" />
					<p className="text-lg text-gray-300">
						Professional pest control services with eco-friendly
						solutions
					</p>
				</div>

				{/* Services Container */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{initialData.services.map(
						(service: Service, index: number) => (
							<div key={service.title} className="w-full">
								<ServiceCard service={service} index={index} />
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
};

export default Services;
