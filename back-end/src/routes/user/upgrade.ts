import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';

export const upgradePlan = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { plan: true },
    });

    if (!subscription) {
      return reply.status(404).send({ error: 'Subscription not found' });
    }

    let newPlan: 'PRO' | 'ENTERPRISE';

    if (subscription.plan === 'BASIC') {
      newPlan = 'PRO';
    } else if (subscription.plan === 'PRO') {
      newPlan = 'ENTERPRISE';
    } else {
      return reply.status(400).send({ error: 'Your plan is already ENTERPRISE' });
    }
    const updatedSubscription = await prisma.subscription.update({
      where: { userId },
      data: {
        plan: newPlan,
        expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    });

    return reply.status(200).send({
      message: 'Plan upgraded successfully',
      plan: updatedSubscription.plan,
    });
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
