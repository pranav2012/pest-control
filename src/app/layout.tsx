// app/layout.tsx
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Script from "next/script";

import ClientLayout from "@/components/ClientLayout";
import { QueryProvider } from "@/providers/query";
import { ThemeProvider } from "@/providers/theme";
import "@/styles/globals.css";
import type { ChildrenProps } from "@/types";
import { getServicesData } from "@/lib/data";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
	adjustFontFallback: false,
});

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Alpha Beneficent Care - Best Pest Control Services in Delhi NCR",
	description:
		"Professional pest control services in Delhi NCR. We offer general pest control, termite control, mosquito control, and more with eco-friendly solutions.",
	keywords:
		"pest control, delhi ncr, termite control, mosquito control, bed bugs control, sanitization services",
	metadataBase: new URL("https://alphabenificentcare.com"),
	icons: {
		icon: [
			{ url: "/favicon/favicon.ico" },
			{
				url: "/favicon/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/favicon/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
		],
		apple: [
			{
				url: "/favicon/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		other: [
			{
				url: "/favicon/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: "/favicon/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	},
	manifest: "/favicon/site.webmanifest",
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: "https://alphabenificentcare.com",
		title: "Alpha Beneficent Care - Best Pest Control Services in Delhi NCR",
		description:
			"Professional pest control services in Delhi NCR with eco-friendly solutions",
		siteName: "Alpha Beneficent Care",
	},
	twitter: {
		card: "summary_large_image",
		title: "Alpha Beneficent Care - Pest Control Services",
		description:
			"Professional pest control services in Delhi NCR with eco-friendly solutions",
	},
};

export default async function RootLayout({ children }: ChildrenProps) {
	// Fetch services data for the header
	const services = await getServicesData();
	const headerServices = services?.services?.map((service) => ({
		title: service.title,
		slug: service.slug,
	})) || [];

	return (
		<html lang="en" suppressHydrationWarning className="overflow-x-hidden">
			<head>
				<Script
					src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"
					strategy="lazyOnload"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
					integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</head>
			<body
				className={`${inter.variable} ${poppins.variable} font-sans antialiased overflow-x-hidden`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem>
					<QueryProvider>
						<ClientLayout services={headerServices}>
							{children}
						</ClientLayout>
						<Toaster
							position="bottom-right"
							toastOptions={{
								className:
									"bg-[var(--card)] text-[var(--foreground)] border-[var(--border)]",
								duration: 3000,
							}}
						/>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
