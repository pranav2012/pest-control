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