export default {
    name: 'services',
    title: 'Services Section',
    type: 'document',
    fields: [
        {
            name: 'section_title',
            title: 'Section Title',
            type: 'string',
        },
        {
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Service Title',
                            type: 'string',
                        },
                        {
                            name: 'slug',
                            title: 'Slug',
                            type: 'slug',
                            options: {
                                source: 'title',
                                maxLength: 96,
                            },
                        },
                        {
                            name: 'date',
                            title: 'Service Date',
                            type: 'date',
                            description: 'When this service was added or last updated',
                        },
                        {
                            name: 'about_service',
                            title: 'About Service',
                            type: 'array',
                            of: [
                                {
                                    type: 'block',
                                    styles: [
                                        { title: 'Normal', value: 'normal' },
                                        { title: 'H2', value: 'h2' },
                                        { title: 'H3', value: 'h3' },
                                        { title: 'H4', value: 'h4' },
                                        { title: 'Quote', value: 'blockquote' }
                                    ],
                                    marks: {
                                        decorators: [
                                            { title: 'Strong', value: 'strong' },
                                            { title: 'Emphasis', value: 'em' },
                                            { title: 'Code', value: 'code' },
                                            { title: 'Underline', value: 'underline' },
                                            { title: 'Strike', value: 'strike-through' }
                                        ],
                                        annotations: [
                                            {
                                                name: 'link',
                                                type: 'object',
                                                title: 'Link',
                                                fields: [
                                                    {
                                                        name: 'href',
                                                        type: 'url',
                                                        title: 'URL'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: 'image',
                                    options: {
                                        hotspot: true
                                    },
                                    fields: [
                                        {
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alternative text',
                                            description: 'Important for SEO and accessibility.'
                                        },
                                        {
                                            name: 'caption',
                                            type: 'string',
                                            title: 'Caption'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'description',
                            title: 'Service Description',
                            type: 'text',
                        },
                        {
                            name: 'image',
                            title: 'Service Image',
                            type: 'object',
                            fields: [
                                {
                                    name: 'src',
                                    title: 'Image',
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
                            ],
                        },
                        {
                            name: 'details',
                            title: 'Service Details',
                            type: 'object',
                            fields: [
                                {
                                    name: 'pests_covered',
                                    title: 'Pests Covered',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                },
                                {
                                    name: 'service_features',
                                    title: 'Service Features',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                },
                                {
                                    name: 'warranty',
                                    title: 'Warranty',
                                    type: 'string',
                                },
                                {
                                    name: 'pest_facts',
                                    title: 'Pest Facts',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                {
                                                    name: 'title',
                                                    title: 'Fact Title',
                                                    type: 'string',
                                                },
                                                {
                                                    name: 'content',
                                                    title: 'Fact Content',
                                                    type: 'text',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'pricing',
                                    title: 'Pricing',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                {
                                                    name: 'type',
                                                    title: 'Property Type',
                                                    type: 'string',
                                                },
                                                {
                                                    name: 'price',
                                                    title: 'Price',
                                                    type: 'string',
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    name: 'treatment_details',
                                    title: 'Treatment Details',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                {
                                                    name: 'title',
                                                    title: 'Title',
                                                    type: 'string',
                                                },
                                                {
                                                    name: 'description',
                                                    title: 'Description',
                                                    type: 'text',
                                                },
                                                {
                                                    name: 'image',
                                                    title: 'Image',
                                                    type: 'image',
                                                    options: {
                                                        hotspot: true,
                                                    },
                                                    fields: [
                                                        {
                                                            name: 'alt',
                                                            title: 'Alt Text',
                                                            type: 'string',
                                                            description: 'Describe the image for screen readers',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'maintenance_contracts',
                                    title: 'Maintenance Contracts',
                                    type: 'array',
                                    of: [
                                        {
                                            type: 'object',
                                            fields: [
                                                {
                                                    name: 'title',
                                                    title: 'Contract Title',
                                                    type: 'string',
                                                },
                                                {
                                                    name: 'description',
                                                    title: 'Contract Description',
                                                    type: 'text',
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                        },
                    ],
                },
            ],
        },
    ],
} 