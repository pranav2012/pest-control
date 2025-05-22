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
                                    name: 'areas_covered',
                                    title: 'Areas Covered',
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
                                    name: 'treatment_process',
                                    title: 'Treatment Process',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                },
                                {
                                    name: 'warranty',
                                    title: 'Warranty',
                                    type: 'string',
                                },
                                {
                                    name: 'service_area',
                                    title: 'Service Area',
                                    type: 'string',
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
                    type: 'string',
                },
            ],
        },
    ],
} 