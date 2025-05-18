export default {
    name: 'header',
    title: 'Header',
    type: 'document',
    fields: [
        {
            name: 'promotion_banner',
            title: 'Promotion Banner',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Banner Text',
                    type: 'string',
                },
                {
                    name: 'background_color',
                    title: 'Background Color',
                    type: 'string',
                    description: 'Use hex color code (e.g., #075e54)',
                },
            ],
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'object',
            fields: [
                {
                    name: 'src',
                    title: 'Logo Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'alt',
                    title: 'Alt Text',
                    type: 'string',
                },
                {
                    name: 'width',
                    title: 'Width',
                    type: 'number',
                },
                {
                    name: 'height',
                    title: 'Height',
                    type: 'number',
                },
            ],
        },
        {
            name: 'navigation',
            title: 'Navigation',
            type: 'object',
            fields: [
                {
                    name: 'main_menu',
                    title: 'Main Menu',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'title',
                                    title: 'Menu Title',
                                    type: 'string',
                                },
                                {
                                    name: 'link',
                                    title: 'Menu Link',
                                    type: 'string',
                                },
                                {
                                    name: 'submenu',
                                    title: 'Submenu Items',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                {
                                                    name: 'title',
                                                    title: 'Submenu Title',
                                                    type: 'string',
                                                },
                                                {
                                                    name: 'link',
                                                    title: 'Submenu Link',
                                                    type: 'string',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'cta_button',
            title: 'CTA Button',
            type: 'object',
            fields: [
                {
                    name: 'text',
                    title: 'Button Text',
                    type: 'string',
                },
                {
                    name: 'link',
                    title: 'Button Link',
                    type: 'url',
                },
                {
                    name: 'type',
                    title: 'Button Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'WhatsApp', value: 'whatsapp' },
                            { title: 'Phone', value: 'phone' },
                            { title: 'Link', value: 'link' },
                        ],
                    },
                },
            ],
        },
    ],
} 