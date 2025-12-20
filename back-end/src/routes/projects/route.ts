import type { FastifyInstance } from 'fastify';
import { createProject } from './createProject.js';
import { authMiddleware } from '../../middleware/auth.js';
import { listProject } from './listProjects.js';
import { planLimitMiddleware } from '../../middleware/planLimitMiddleware.js';
import { deleteProject } from './deleteProject.js';

export const projectsRoute = (app: FastifyInstance) => {
  app.post('/projects', { preHandler: [authMiddleware, planLimitMiddleware] }, createProject);
  app.get('/projects', { preHandler: authMiddleware }, listProject);
  app.delete('/projects/:id', { preHandler: authMiddleware }, deleteProject);
};
