"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
	Facebook,
	Instagram,
	Phone,
	Mail,
	MapPin,
	CreditCard,
	IndianRupee,
	Banknote,
	CircleDollarSign,
	Clock,
	Shield,
	Award,
} from "lucide-react";
import footerData from "@/content/footer.json";
import { SocialLink } from "@/types/footer";

interface FooterProps {
	services: Array<{ title: string; slug: string }>;
}

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
	<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
	</svg>
);

const SocialIcon = ({ platform }: { platform: string }) => {
	switch (platform.toLowerCase()) {
		case "facebook":
			return <Facebook className="w-5 h-5" />;
		case "instagram":
			return <Instagram className="w-5 h-5" />;
		case "whatsapp":
			return <WhatsAppIcon />;
		default:
			return null;
	}
};

const PaymentMethodIcon = ({ method }: { method: string }) => {
	const getIcon = () => {
		switch (method.toLowerCase()) {
			case "upi":
				return <IndianRupee className="w-4 h-4" />;
			case "visa":
			case "mastercard":
				return <CreditCard className="w-4 h-4" />;
			case "cash":
				return <Banknote className="w-4 h-4" />;
			default:
				return <CircleDollarSign className="w-4 h-4" />;
		}
	};

	return (
		<div className="inline-flex items-center justify-center w-8 h-8 bg-white/10 rounded-md hover:bg-white/20 transition-colors duration-300">
			{getIcon()}
		</div>
	);
};

const Footer = ({ services }: FooterProps) => {
	const [domainUrl, setDomainUrl] = useState("");

	useEffect(() => {
		// Get domain URL
		if (typeof window !== "undefined") {
			const url = window.location.origin;
			setDomainUrl(url);
		}
	}, []);

	const getFullUrl = (link: string) => {
		if (link.startsWith("/#")) {
			return `${domainUrl}${link}`;
		}
		return link;
	};

	return (
		<footer className="bg-gray-900 text-white relative">
			{/* Main Footer Content */}
			<div className="container mx-auto px-4 py-12 lg:py-16">
				{/* Top Section - Features */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-12 pb-12 border-b border-gray-800">
					<div className="flex items-center space-x-4 bg-[#B9FB4B]/5 p-4 lg:p-6 rounded-xl">
						<div className="bg-[#B9FB4B]/10 p-2.5 rounded-lg">
							<Clock className="w-5 h-5 text-[#B9FB4B]" />
						</div>
						<div>
							<h4 className="font-semibold text-[#B9FB4B]">
								24/7 Support
							</h4>
							<p className="text-sm text-gray-400">
								Always here to help you
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-4 bg-[#B9FB4B]/5 p-4 lg:p-6 rounded-xl">
						<div className="bg-[#B9FB4B]/10 p-2.5 rounded-lg">
							<Shield className="w-5 h-5 text-[#B9FB4B]" />
						</div>
						<div>
							<h4 className="font-semibold text-[#B9FB4B]">
								Licensed & Insured
							</h4>
							<p className="text-sm text-gray-400">
								Professional service guaranteed
							</p>
						</div>
					</div>
					<div className="flex items-center space-x-4 bg-[#B9FB4B]/5 p-4 lg:p-6 rounded-xl sm:col-span-2 lg:col-span-1">
						<div className="bg-[#B9FB4B]/10 p-2.5 rounded-lg">
							<Award className="w-5 h-5 text-[#B9FB4B]" />
						</div>
						<div>
							<h4 className="font-semibold text-[#B9FB4B]">
								Expert Team
							</h4>
							<p className="text-sm text-gray-400">
								Experienced professionals
							</p>
						</div>
					</div>
				</div>

				{/* Main Grid Section */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-12">
					{/* Company Info */}
					<div className="lg:col-span-4 space-y-4 lg:space-y-6">
						<h2 className="text-xl lg:text-2xl font-bold text-[#B9FB4B]">
							Alpha Beneficent Care
						</h2>
						<p className="text-sm text-gray-400 leading-relaxed">
							{footerData.company_info.description}
						</p>
						<div className="flex items-center space-x-3 pt-2">
							{footerData.company_info.social_links.map(
								(social: SocialLink) => (
									<Link
										key={social.platform}
										href={social.link}
										target="_blank"
										rel="noopener noreferrer"
										className="bg-[#B9FB4B]/10 p-2.5 rounded-lg text-[#B9FB4B] hover:bg-[#B9FB4B] hover:text-white transition-all duration-300">
										<SocialIcon
											platform={social.platform}
										/>
									</Link>
								)
							)}
						</div>
					</div>

					{/* Services Section */}
					<div className="lg:col-span-3 space-y-4">
						<h3 className="text-lg lg:text-xl font-semibold text-[#B9FB4B]">
							Our Services
						</h3>
						<ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
							{services.map((service) => (
								<li key={service.title}>
									<Link
										href={`/services/${service.slug}`}
										className="text-gray-400 hover:text-[#B9FB4B] transition-all duration-300 text-sm flex items-center group">
										<span className="h-1.5 w-1.5 bg-[#B9FB4B] rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
										{service.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div className="lg:col-span-2 space-y-4">
						<h3 className="text-lg lg:text-xl font-semibold text-[#B9FB4B]">
							{footerData.quick_links.title}
						</h3>
						<ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
							{footerData.quick_links.links.map((link) => (
								<li key={link.text}>
									<Link
										href={getFullUrl(link.url)}
										className="text-gray-400 hover:text-[#B9FB4B] transition-all duration-300 text-sm flex items-center group">
										<span className="h-1.5 w-1.5 bg-[#B9FB4B] rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
										{link.text}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="lg:col-span-3 space-y-4">
						<h3 className="text-lg lg:text-xl font-semibold text-[#B9FB4B]">
							{footerData.contact_info.title}
						</h3>
						<div className="space-y-3">
							{/* Desktop view */}
							<div className="hidden md:flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
								<MapPin className="w-5 h-5 text-[#B9FB4B]" />
								<a
									href="https://maps.google.com/?q=Alpha+Beneficent+Care+M5+Green+Park+Near+Metro"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-400 hover:text-[#B9FB4B] transition-colors duration-300 text-sm">
									Head Office
								</a>
							</div>
							{/* Mobile view */}
							<div className="md:hidden">
								<a
									href="https://maps.google.com/?q=Alpha+Beneficent+Care+M5+Green+Park+Near+Metro"
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full">
									<div className="flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
										<MapPin className="w-5 h-5 text-[#B9FB4B]" />
										<span className="text-gray-400 text-sm">
											Head Office
										</span>
									</div>
								</a>
							</div>
							{/* Desktop view */}
							<div className="hidden md:flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
								<Phone className="w-5 h-5 text-[#B9FB4B]" />
								<div className="flex flex-col space-y-1">
									<a
										href="tel:+918882002546"
										className="text-gray-400 hover:text-[#B9FB4B] transition-colors duration-300 text-sm">
										+91 8882002546
									</a>
								</div>
							</div>
							{/* Mobile view */}
							<div className="md:hidden flex flex-col space-y-2">
								<a
									href="tel:+918882002546"
									className="flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
									<Phone className="w-5 h-5 text-[#B9FB4B]" />
									<span className="text-gray-400 text-sm">
										+91 8882002546
									</span>
								</a>
							</div>
							{/* Desktop view */}
							<div className="hidden md:flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
								<Mail className="w-5 h-5 text-[#B9FB4B]" />
								<a
									href={`mailto:${footerData.contact_info.email}?subject=Enquiry for Pest Control Services&body=Hi, I am interested in your pest control services. Please provide more information.`}
									className="text-gray-400 hover:text-[#B9FB4B] transition-colors duration-300 text-sm break-all">
									{footerData.contact_info.email}
								</a>
							</div>
							{/* Mobile view */}
							<div className="md:hidden">
								<a
									href={`mailto:${footerData.contact_info.email}?subject=Enquiry for Pest Control Services&body=Hi, I am interested in your pest control services. Please provide more information.`}
									className="block w-full">
									<div className="flex items-center space-x-3 p-3 bg-[#B9FB4B]/5 rounded-lg hover:bg-[#B9FB4B]/10 transition-colors duration-300">
										<Mail className="w-5 h-5 text-[#B9FB4B] shrink-0" />
										<span className="text-gray-400 text-sm break-all">
											{footerData.contact_info.email}
										</span>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Payment Methods Section */}
				<div className="border-t border-gray-800 pt-6">
					<div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
						<div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
							<span className="text-sm text-gray-400">
								Accepted Payments:
							</span>
							<div className="flex items-center space-x-2">
								{footerData.bottom_bar.payment_methods.map(
									(method) => (
										<PaymentMethodIcon
											key={method}
											method={method}
										/>
									)
								)}
							</div>
						</div>
						<p className="text-gray-400 text-[11px] leading-tight sm:text-sm text-center sm:text-right">
							© {new Date().getFullYear()} Alpha Beneficent Care
							Pvt. Ltd. All rights reserved.
						</p>
					</div>
				</div>
			</div>

			{/* WhatsApp Button */}
			<Link
				href={`https://wa.me/${footerData.contact_info.whatsapp}`}
				target="_blank"
				rel="noopener noreferrer"
				className="fixed bottom-6 right-6 bg-[#B9FB4B] text-white p-4 rounded-full shadow-lg hover:bg-[#86B82D] transition-all duration-300 hover:scale-110 z-50">
				<WhatsAppIcon className="w-8 h-8" />
			</Link>
		</footer>
	);
};

export default Footer;
