export interface ServiceImage {
    src: string
    alt: string
}

export interface Service {
    title: string
    description: string
    image: ServiceImage
    link: string
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