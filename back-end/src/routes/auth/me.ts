import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { meService } from '../../services/auth/meService.js';

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const res = await meService({ userId: req.user.sub as any });
    reply.send(res);
  } catch (err: any) {
    if (err.message === 'User not found') {
      return reply.status(404).send({ error: 'User not found' });
    }
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
