"use client";

import { usePathname } from "next/navigation";
import MainFooter from "@/components/Footer";
import PromotionalBanner from "@/components/PromotionalBanner";
import Header from "@/components/Header";
import { ServicesProvider } from "@/contexts/ServicesContext";
import type { ChildrenProps } from "@/types";

interface ClientLayoutProps extends ChildrenProps {
	services: Array<{ title: string; slug: string }>;
}

export default function ClientLayout({
	children,
	services,
}: ClientLayoutProps) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith("/admin");

	return (
		<div className="flex min-h-screen bg-[var(--background)] w-full overflow-x-hidden">
			<div className="flex-1 flex flex-col w-full">
				{!isAdminRoute && <PromotionalBanner />}
				<ServicesProvider services={services}>
					{!isAdminRoute && <Header />}
					<main
						className={`flex-1 w-full overflow-x-hidden ${!isAdminRoute ? "pt-[112px]" : ""}`}>
						{children}
					</main>
				</ServicesProvider>
				{!isAdminRoute && <MainFooter services={services} />}
			</div>
		</div>
	);
}
