import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { dashboardService } from '../../services/user/dashboardService.js';

export const dashboard = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;
    const response = await dashboardService(userId);

    return reply.send(response);
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
