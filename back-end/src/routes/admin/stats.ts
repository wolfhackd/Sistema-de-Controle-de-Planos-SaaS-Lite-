import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

export const stats = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const totalUsers = await prisma.user.count();
    const activeSubscriptions = await prisma.subscription.count({
      where: {
        active: true,
      },
    });

    const now = new Date();

    const usageThisMonth = await prisma.usage.aggregate({
      _sum: {
        projectsCount: true,
        requestsCount: true,
      },
      //testar depois
      where: {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
      },
    });

    return reply.send({
      totalUsers,
      activeSubscriptions,
      usageThisMonth: {
        projects: usageThisMonth._sum!.projectsCount || 0,
        requests: usageThisMonth._sum!.requestsCount || 0,
      },
    });
  } catch {
    return reply.status(500).send({ error: 'Error to get stats' });
  }
};
