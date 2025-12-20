import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

export const listProject = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: true,
      },
    });

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }
    if (!user.projects) {
      return reply.status(404).send({ error: 'Projects not found' });
    }

    reply.send(user.projects);
  } catch {
    return reply.status(500).send({ error: 'Error to list projects' });
  }
};
