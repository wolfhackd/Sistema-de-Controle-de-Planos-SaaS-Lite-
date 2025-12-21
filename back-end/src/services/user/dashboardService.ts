import { prisma } from '../../../prisma.js';

export type DashboardResponse = {
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

export async function dashboardService(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      usage: true,
    },
  });

  if (!user || !user.subscription) {
    throw new Error('Unauthorized');
  }

  const plan = user.subscription.plan;

  const planLimits = {
    BASIC: { requests: 1000, projects: 3 },
    PRO: { requests: 10000, projects: 50 },
    ENTERPRISE: { requests: Infinity, projects: Infinity },
  };

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

  return response;
}
