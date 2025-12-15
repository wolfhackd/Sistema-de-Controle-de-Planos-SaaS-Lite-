import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

export const downgradePlan = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true },
    });

    if (!subscription) {
      return reply.status(404).send({ error: 'Subscription not found' });
    }

    let newPlan: 'BASIC' | 'PRO';

    if (subscription.plan === 'PRO') {
      newPlan = 'BASIC';
    } else if (subscription.plan === 'ENTERPRISE') {
      newPlan = 'PRO';
    } else {
      return reply.status(400).send({ error: 'Your plan is already BASIC' });
    }
    const updatedSubscription = await prisma.subscription.update({
      where: { userId },
      data: {
        plan: newPlan,
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    });

    return reply.status(200).send({
      plan: updatedSubscription.plan,
    });
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
