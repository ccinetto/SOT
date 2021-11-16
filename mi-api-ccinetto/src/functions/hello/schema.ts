export default {
  type: 'object',
  properties: {
    name: { type: 'string' },
    question_type: {
      type: 'string',
      enum: ['text', 'rating'],
    },
  },
  required: ['name', 'question_type'],
} as const;
