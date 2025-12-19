import type { FastifyInstance } from 'fastify';
import { listUsers } from './listUsers.js';
import { planChange } from './planChange.js';
import { stats } from './stats.js';
import { adminMiddleware } from '../../middleware/adminMiddleware.js';
import { authMiddleware } from '../../middleware/auth.js';

export const adminRoutes = (app: FastifyInstance) => {
  app.get('/users', { preHandler: [authMiddleware, adminMiddleware] }, listUsers);
  app.patch('/users/:id/plan', { preHandler: [authMiddleware, adminMiddleware] }, planChange);
  app.get('/stats', { preHandler: [authMiddleware, adminMiddleware] }, stats);
};
