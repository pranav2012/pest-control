export interface SubMenuItem {
    title: string
    link: string
}

export interface MenuItem {
    title: string
    link: string
    submenu?: SubMenuItem[]
}

interface PromotionBanner {
    text: string
    background_color: string
}

interface Logo {
    src: string
    alt: string
    width: number
    height: number
}

interface Navigation {
    main_menu: MenuItem[]
}

interface CTAButton {
    text: string
    link: string
    type: string
}

export interface HeaderData {
    promotion_banner: PromotionBanner
    logo: Logo
    navigation: Navigation
    cta_button: CTAButton
} 