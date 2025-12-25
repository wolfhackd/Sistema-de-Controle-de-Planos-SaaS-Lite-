import type { FastifyReply, FastifyRequest } from 'fastify';
import { listProjectsService } from '../../services/projects/listProjectsService.js';

export const listProject = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;

    console.log(userId);
    const res = await listProjectsService(userId);

    reply.send(res);
  } catch {
    return reply.status(500).send({ error: 'Error to list projects' });
  }
};
