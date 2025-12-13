import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import type { use } from 'react';

type DashboardResponse = {
  plan: 'BASIC' | 'PRO' | 'ENTERPRISE';
  limits: {
    projects: number;
    requests: number;
  };
  usage: {
    projects: number;
    requests: number;
  };
};

//aplicar limites aqui
// BASIC: 1.000 requisições/mês, 3 projetos

// PRO: 10.000 requisições/mês, 50 projetos

// ENTERPRISE: sem limite (ou limites altos personalizáveis)

export const dashboard = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    await req.jwtVerify();

    const userId = req.user.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
        usage: true,
      },
    });

    if (!user || !user.subscription) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    const plan = user.subscription.plan;

    const planLimits = {
      BASIC: { requests: 1000, projects: 3 },
      PRO: { requests: 10000, projects: 50 },
      ENTERPRISE: { requests: Infinity, projects: Infinity },
    } as const;

    const limit = planLimits[plan];

    const response: DashboardResponse = {
      plan,
      limits: {
        projects: limit.projects,
        requests: limit.requests,
      },
      usage: {
        projects: user.usage?.projectsCount ?? 0,
        requests: user.usage?.requestsCount ?? 0,
      },
    };

    return reply.send(response);
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
