import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/queries";

export default async function ServicesPage() {
	const services = await getServices();

	return (
		<main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8">
			<div className="max-w-6xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-white mb-10 text-center">
					Our Services
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service) => (
						<Link
							key={service.slug}
							href={`/services/${service.slug}`}
							className="relative flex flex-col bg-gray-900/80 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full border border-[#B9FB4B]/20">
							<div className="relative h-48 overflow-hidden sm:h-56">
								<Image
									src={service.image.src}
									alt={service.image.alt}
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-105"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
							</div>
							<div className="relative space-y-4 p-5">
								<h3 className="text-xl font-semibold text-white">
									{service.title}
								</h3>
								<p className="text-sm leading-relaxed text-gray-300">
									{service.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{(
										service.details.pests_covered ||
										service.details.areas_covered
									)
										?.slice(0, 3)
										.map((item: string) => (
											<span
												key={item}
												className="relative inline-flex items-center rounded-lg bg-[#B9FB4B]/10 px-3 py-1 text-xs font-medium text-[#B9FB4B] ring-1 ring-[#B9FB4B]/20">
												{item}
											</span>
										))}
								</div>
								<span className="inline-block mt-4 text-[#B9FB4B] font-medium group-hover:text-white transition-colors">
									Learn More &rarr;
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
