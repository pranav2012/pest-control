export default {
    name: 'features',
    title: 'Features Section',
    type: 'document',
    fields: [
        {
            name: 'section_title',
            title: 'Section Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                        },
                        {
                            name: 'description',
                            title: 'Feature Description',
                            type: 'text',
                            rows: 3,
                        },
                    ],
                },
            ],
        },
    ],
} 