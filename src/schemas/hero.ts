export default {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'main_content',
            title: 'Main Content',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'subtitle',
                    title: 'Subtitle',
                    type: 'string',
                },
                {
                    name: 'cta_buttons',
                    title: 'CTA Buttons',
                    type: 'array',
                    of: [
                        {
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
            name: 'contact_form',
            title: 'Contact Form',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Form Title',
                    type: 'string',
                },
                {
                    name: 'fields',
                    title: 'Form Fields',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                {
                                    name: 'type',
                                    title: 'Field Type',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Text', value: 'text' },
                                            { title: 'Phone', value: 'tel' },
                                            { title: 'Select', value: 'select' },
                                            { title: 'Textarea', value: 'textarea' },
                                        ],
                                    },
                                },
                                {
                                    name: 'name',
                                    title: 'Field Name',
                                    type: 'string',
                                },
                                {
                                    name: 'label',
                                    title: 'Field Label',
                                    type: 'string',
                                },
                                {
                                    name: 'placeholder',
                                    title: 'Placeholder',
                                    type: 'string',
                                },
                                {
                                    name: 'required',
                                    title: 'Required',
                                    type: 'boolean',
                                },
                                {
                                    name: 'options',
                                    title: 'Select Options',
                                    type: 'array',
                                    of: [{ type: 'string' }],
                                    hidden: ({ parent }) => parent?.type !== 'select',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'submit_button',
                    title: 'Submit Button',
                    type: 'object',
                    fields: [
                        {
                            name: 'text',
                            title: 'Button Text',
                            type: 'string',
                        },
                        {
                            name: 'type',
                            title: 'Button Type',
                            type: 'string',
                            initialValue: 'submit',
                        },
                    ],
                },
            ],
        },
    ],
} 