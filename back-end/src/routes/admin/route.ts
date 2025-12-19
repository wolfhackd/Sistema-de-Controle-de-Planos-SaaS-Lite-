import type { FastifyInstance } from 'fastify';
import { listUsers } from './listUsers.js';
import { planChange } from './planChange.js';
import { stats } from './stats.js';

export const adminRoutes = (app: FastifyInstance) => {
  app.get('/users', listUsers);
  app.patch('/users/:id/plan', planChange);
  app.get('/stats', stats);
};
