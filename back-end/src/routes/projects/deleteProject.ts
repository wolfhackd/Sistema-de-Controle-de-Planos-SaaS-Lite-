import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { deleteProjectService } from '../../services/projects/deleteProjectService.js';

export const deleteProject = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;
    const { id } = req.params as { id: string };

    // const project = await prisma.project.delete({
    //   where: {
    //     id,
    //     user: {
    //       id: userId,
    //     },
    //   },
    // });

    // if (!project) {
    //   return reply.status(404).send({ error: 'Project not found' });
    // }

    // reply.send({ message: 'Project deleted successfully' });

    const res = await deleteProjectService(userId, id);
    reply.send({ message: 'Project deleted successfully' });
  } catch {
    return reply.status(500).send({ error: 'Error to delete project' });
  }
};
