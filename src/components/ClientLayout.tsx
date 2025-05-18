"use client";

import { usePathname } from "next/navigation";
import MainFooter from "@/components/Footer";
import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
import type { ChildrenProps } from "@/types";

export default function ClientLayout({ children }: ChildrenProps) {
	const pathname = usePathname();
	const isAdminRoute = pathname?.startsWith("/admin");

	return (
		<div className="flex min-h-screen bg-[var(--background)] w-full overflow-x-hidden">
			<div className="flex-1 flex flex-col w-full">
				{!isAdminRoute && <PromotionalBanner />}
				{!isAdminRoute && <Header />}
				<main
					className={`flex-1 w-full overflow-x-hidden ${!isAdminRoute ? "pt-[112px]" : ""}`}>
					{children}
				</main>
				{!isAdminRoute && <MainFooter />}
			</div>
		</div>
	);
}
