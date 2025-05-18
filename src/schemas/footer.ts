export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        {
            name: 'company_info',
            title: 'Company Information',
            type: 'object',
            fields: [
                {
                    name: 'description',
                    title: 'Company Description',
                    type: 'text',
                    rows: 4,
                },
                {
                    name: 'social_links',
                    title: 'Social Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'platform',
                                    title: 'Platform Name',
                                    type: 'string',
                                },
                                {
                                    name: 'link',
                                    title: 'Profile Link',
                                    type: 'url',
                                },
                                {
                                    name: 'icon',
                                    title: 'Icon Name',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Facebook', value: 'facebook' },
                                            { title: 'Instagram', value: 'instagram' },
                                            { title: 'Twitter', value: 'twitter' },
                                            { title: 'LinkedIn', value: 'linkedin' },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'information_menu',
            title: 'Information Menu',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Menu Title',
                    type: 'string',
                },
                {
                    name: 'links',
                    title: 'Menu Links',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'text',
                                    title: 'Link Text',
                                    type: 'string',
                                },
                                {
                                    name: 'url',
                                    title: 'Link URL',
                                    type: 'string',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: 'contact_info',
            title: 'Contact Information',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Section Title',
                    type: 'string',
                },
                {
                    name: 'address',
                    title: 'Address',
                    type: 'text',
                },
            ],
        },
        {
            name: 'bottom_bar',
            title: 'Bottom Bar',
            type: 'object',
            fields: [
                {
                    name: 'copyright',
                    title: 'Copyright Text',
                    type: 'string',
                },
                {
                    name: 'payment_methods',
                    title: 'Payment Methods',
                    type: 'array',
                    of: [
                        {
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Visa', value: 'visa' },
                                    { title: 'Mastercard', value: 'mastercard' },
                                    { title: 'Discover', value: 'discover' },
                                    { title: 'Apple Pay', value: 'apple-pay' },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    ],
} 