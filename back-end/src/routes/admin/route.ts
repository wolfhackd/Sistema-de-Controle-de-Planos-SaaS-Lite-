import type { FastifyInstance } from 'fastify';
import { listUsers } from './listUsers.js';

export const adminRoutes = (app: FastifyInstance) => {
  app.get('/users', listUsers);
};
