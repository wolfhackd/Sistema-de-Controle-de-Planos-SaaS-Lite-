import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

type listUsersResponse = {
  id: string;
  name: string;
  email: string;
  plan: string;
  usage: {
    projects: number;
    requests: number;
  };
  active: boolean;
};

export const listUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        subscription: true,
        usage: true,
      },
    });

    if (!users) {
      return reply.status(404).send({ error: 'Users not found' });
    }

    const formattedUsers = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.subscription?.plan ?? 'BASIC',
        usage: {
          projects: user.usage?.projectsCount ?? 0,
          requests: user.usage?.requestsCount ?? 0,
        },
        active: user.subscription?.active ?? false,
      };
    });
    reply.send(formattedUsers);
  } catch {
    return reply.status(500).send({ error: 'Error to list users' });
  }
};

[
  {
    id: 'uuid',
    name: 'Mauro',
    email: 'mauro@email.com',
    plan: 'BASIC',
    usage: {
      projects: 2,
      requests: 340,
    },
    active: true,
  },
];
