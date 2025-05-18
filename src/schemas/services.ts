export default {
    name: 'services',
    title: 'Services',
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
                            type: 'object',
                            fields: [
                                {
                                    name: 'src',
                                    title: 'Source',
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
                            name: 'link',
                            title: 'Link',
                            type: 'slug',
                            options: {
                                source: 'title',
                            },
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
            ],
        },
    ],
} 