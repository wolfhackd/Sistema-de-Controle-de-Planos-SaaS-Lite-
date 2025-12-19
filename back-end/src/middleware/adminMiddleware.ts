import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserRole } from '../generated/prisma/client.js';
import { prisma } from '../../prisma.js';

export const adminMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  // const user = request.user.sub;
  const userId = request.user.sub;
  const user = await prisma.user.findUnique({
    where: { id: request.user.sub },
  });

  if (!user) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  if (user.role !== UserRole.ADMIN) {
    return reply.status(403).send({ error: 'Forbidden: Admin only' });
  }
};
