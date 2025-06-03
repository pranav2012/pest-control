/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import DelhiNCR from "@/components/DelhiNCR";
import Branches from "@/components/Branches";
import { getServicesData } from "@/lib/data";

// Enable static generation with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false;

export default async function Home() {
	// Fetch data server-side
	const [servicesData] = await Promise.all([
		getServicesData(),
	]);

	return (
		<main className="min-h-screen">
			<Hero />
			<Services initialData={servicesData} />
			<DelhiNCR />
			<Process />
			<Branches />
		</main>
	);
}
