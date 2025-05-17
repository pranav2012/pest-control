export interface ServiceImage {
    src: string
    alt: string
}

export interface ServiceDetails {
    pests_covered?: string[]
    areas_covered?: string[]
    service_features: string[]
    treatment_process: string[]
    warranty: string
    service_area: string
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