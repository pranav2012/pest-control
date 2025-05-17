export interface SocialLink {
    platform: string
    link: string
    icon: string
}

export interface CompanyInfo {
    description: string
    social_links: SocialLink[]
}

export interface FooterLink {
    text: string
    url: string
}

export interface QuickLinks {
    title: string
    links: FooterLink[]
}

export interface ContactInfo {
    title: string
    address: string
    phone: string
    email: string
    whatsapp: string
}

export interface BottomBar {
    copyright: string
    payment_methods: string[]
}

export interface FooterData {
    company_info: CompanyInfo
    quick_links: QuickLinks
    contact_info: ContactInfo
    bottom_bar: BottomBar
} 