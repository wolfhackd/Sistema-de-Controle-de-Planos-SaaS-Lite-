import type { FastifyInstance } from 'fastify';
import { createProject } from './create.js';
import { authMiddleware } from '../../middleware/auth.js';
import { listProject } from './list.js';
import { planLimitMiddleware } from '../../middleware/planLimitMiddleware.js';
import { deleteProject } from './delete.js';

export const projectsRoute = (app: FastifyInstance) => {
  app.post('/projects', { preHandler: [authMiddleware, planLimitMiddleware] }, createProject);
  app.get('/projects', { preHandler: authMiddleware }, listProject);
  app.delete('/projects/:id', { preHandler: authMiddleware }, deleteProject);
};
