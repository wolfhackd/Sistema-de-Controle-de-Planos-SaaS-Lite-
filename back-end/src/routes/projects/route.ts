import type { FastifyInstance } from 'fastify';
import { createProject } from './createProject.js';
import { authMiddleware } from '../../middleware/auth.js';
import { listProject } from './listProjects.js';
import { planLimitMiddleware } from '../../middleware/planLimitMiddleware.js';
import { deleteProject } from './deleteProject.js';
import { createProjectSchema } from './createProjectSchema.js';
import { deleteProjectSchema } from './deleteProjectSchema.js';
import { listProjectsSchema } from './listProjectsSchema.js';

export const projectsRoute = async (app: FastifyInstance) => {
  app.post(
    '/',
    {
      schema: createProjectSchema,
      preHandler: [authMiddleware, planLimitMiddleware],
    },
    createProject,
  );

  app.get('/', { schema: listProjectsSchema, preHandler: authMiddleware }, listProject);

  app.delete('/:id', { schema: deleteProjectSchema, preHandler: authMiddleware }, deleteProject);
};
