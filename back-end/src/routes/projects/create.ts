import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

export const createProject = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;
    const { name } = req.body as { name: string };

    const newProject = await prisma.project.create({
      data: {
        name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!newProject) {
      return reply.status(500).send({ error: 'Error creating project' });
    }

    await prisma.usage.update({
      where: { userId },
      data: {
        projectsCount: { increment: 1 },
      },
    });

    reply.send({
      id: newProject.id,
      name: newProject.name,
    });
  } catch {
    return reply.status(500).send({ error: 'Error creating project' });
  }
};
