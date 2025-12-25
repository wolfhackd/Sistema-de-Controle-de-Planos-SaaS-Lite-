export const listProjectsSchema = {
  tags: ['Projects'],
  summary: 'Listar todos os projetos',
  description: 'Retorna todos os projetos vinculados ao usuário logado',

  response: {
    200: {
      type: 'array',
      items: {
        id: { type: 'string' },
        name: { type: 'string' },
        userId: { type: 'string' },
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
