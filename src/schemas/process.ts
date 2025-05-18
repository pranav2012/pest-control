export default {
    name: 'process',
    title: 'Process Section',
    type: 'document',
    fields: [
        {
            name: 'section_title',
            title: 'Section Title',
            type: 'string',
        },
        {
            name: 'steps',
            title: 'Process Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Step Title',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Step Description',
                            type: 'text',
                        },
                        {
                            name: 'icon',
                            title: 'Step Icon (SVG)',
                            type: 'image',
                            options: {
                                accept: '.svg'
                            }
                        },
                    ],
                },
            ],
        },
        {
            name: 'side_image',
            title: 'Side Image',
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
    ],
} 