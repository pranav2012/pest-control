export interface ProcessStep {
    title: string
    description: string
    icon: string
}

export interface SideImage {
    src: string
    alt: string
}

export interface ProcessData {
    section_title: string
    steps: ProcessStep[]
    side_image: SideImage
} 