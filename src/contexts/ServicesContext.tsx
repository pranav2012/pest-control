"use client";

import { createContext, useContext, ReactNode } from "react";

interface Service {
	title: string;
	slug: string;
}

interface ServicesContextType {
	services: Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(
	undefined
);

export function ServicesProvider({
	children,
	services,
}: {
	children: ReactNode;
	services: Service[];
}) {
	return (
		<ServicesContext.Provider value={{ services }}>
			{children}
		</ServicesContext.Provider>
	);
}

export function useServices() {
	const context = useContext(ServicesContext);
	if (context === undefined) {
		throw new Error("useServices must be used within a ServicesProvider");
	}
	return context;
}
