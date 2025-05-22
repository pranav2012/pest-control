export interface ServiceImage {
    src: string
    alt: string
}

export interface PestFact {
    title: string
    content: string
}

export interface Pricing {
    type: string
    price: string
}

export interface TreatmentDetail {
    title: string
    description: string
    image?: {
        src: string
        alt: string
    }
}

export interface MaintenanceContract {
    title: string
    description: string
}

export interface ServiceDetails {
    pests_covered?: string[]
    areas_covered?: string[]
    service_features: string[]
    treatment_process: string[]
    warranty: string
    service_area: string
    pest_facts?: PestFact[]
    pricing?: Pricing[]
    treatment_details?: TreatmentDetail[]
    maintenance_contracts?: MaintenanceContract[]
}

export interface Service {
    title: string
    description: string
    image: ServiceImage
    details: ServiceDetails
}

export interface CTAButton {
    text: string
    link: string
}

export interface ServicesData {
    section_title: string
    services: Service[]
    cta_button: CTAButton
} 