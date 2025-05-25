export interface ServiceImage {
    src: string
    alt: string
}

export interface ServiceBlock {
    _key: string
    _type: string
    style: string
    children: Array<{
        _type: string
        text: string
    }>
}

export interface PestFact {
    title: string
    content: string
}

export interface Pricing {
    _key: string
    type: string
    price: string
    includes?: string[]
}

export interface TreatmentDetail {
    title: string
    description: string
    image?: ServiceImage
}

export interface MaintenanceContract {
    title: string
    description: string
    price?: string
    features?: string[]
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
    _key: string
    title: string
    slug: string
    date?: string
    about_service?: ServiceBlock[]
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