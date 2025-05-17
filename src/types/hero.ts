export interface CTAButton {
    text: string
    link: string
    type: string
}

export interface MainContent {
    title: string
    subtitle: string
    cta_buttons: CTAButton[]
}

export interface FormField {
    type: string
    name: string
    label: string
    placeholder?: string
    required: boolean
    pattern?: string
    options?: string[]
}

export interface SubmitButton {
    text: string
    type: string
}

export interface ContactForm {
    title: string
    fields: FormField[]
    submit_button: SubmitButton
}

export interface HeroData {
    main_content: MainContent
    contact_form: ContactForm
} 