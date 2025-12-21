import type { FastifyReply, FastifyRequest } from 'fastify';
import { createProjectService } from '../../services/projects/createProjectService.js';

export const createProject = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name } = req.body as { name: string };

    const data = {
      userId: req.user.sub,
      name: name,
    };

    const newProject = await createProjectService(data);
    reply.send(newProject);
  } catch (err: any) {
    if (err.message === 'Error creating project') {
      return reply.status(404).send({ error: 'Error creating project' });
    }
    return reply.status(500).send({ error: 'Error creating project' });
  }
};
