import type { FastifyInstance } from 'fastify';
import { authMiddleware } from '../../middleware/auth.js';
import { dashboard } from './dashboard.js';
import { upgradePlan } from './upgrade.js';
import { downgradePlan } from './downgrade.js';

export const userRoutes = (app: FastifyInstance) => {
  app.get('/dashboard', { preHandler: authMiddleware }, dashboard);
  app.get('/upgrade', { preHandler: authMiddleware }, upgradePlan);
  app.get('/downgrade', { preHandler: authMiddleware }, downgradePlan);
};
