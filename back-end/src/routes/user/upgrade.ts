import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/client.js';
import { upgradeService } from '../../services/user/upgradeService.js';

export const upgradePlan = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;
    const res = await upgradeService(userId);

    return reply.status(200).send(res);
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
