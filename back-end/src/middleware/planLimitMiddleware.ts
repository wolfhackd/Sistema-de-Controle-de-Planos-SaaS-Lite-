import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../prisma.js';

export const PLAN_LIMITS = {
  BASIC: {
    projects: 3,
    requests: 1000,
  },
  PRO: {
    projects: 50,
    requests: 10000,
  },
  ENTERPRISE: {
    projects: Infinity,
    requests: Infinity,
  },
};

export async function planLimitMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      usage: true,
    },
  });

  if (!user?.subscription || !user.subscription.active) {
    return reply.status(401).send({ error: 'Plan inactive' });
  }

  const plan = user.subscription.plan;
  const limit = PLAN_LIMITS[plan];

  if (!limit) {
    return reply.status(401).send({ error: 'Plan not found' });
  }

  if (user.usage!.requestsCount >= limit.requests) {
    return reply.status(401).send({ error: 'Request limit exceeded' });
  }

  if (user.usage!.projectsCount >= limit.projects) {
    return reply.status(401).send({ error: 'Project limit exceeded' });
  }
}
