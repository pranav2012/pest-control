/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */

import { motion } from "framer-motion";
import { ArrowRight, Code, Rocket, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import DelhiNCR from "@/components/DelhiNCR";
import Branches from "@/components/Branches";

// Enable static generation with on-demand revalidation
export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
	const fadeIn = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<main className="min-h-screen">
			<Hero />
			<Services />
			<DelhiNCR />
			<Process />
			<Branches />
		</main>
	);
}
