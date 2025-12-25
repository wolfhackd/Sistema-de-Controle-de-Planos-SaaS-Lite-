export const deleteProjectSchema = {
  tags: ['Projects'],
  summary: 'Deletar um projeto',

  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        minLength: 1,
      },
    },
  },

  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' },
      },
    },
  },
};
