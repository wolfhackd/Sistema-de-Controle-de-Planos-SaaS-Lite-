import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/enums.js';
import { downgradeService } from '../../services/user/downgradeService.js';

export const downgradePlan = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = req.user.sub;

    // const subscription = await prisma.subscription.findUnique({
    //   where: { userId },
    //   select: { plan: true },
    // });

    // if (!subscription) {
    //   return reply.status(404).send({ error: 'Subscription not found' });
    // }

    // let newPlan: PlanType;

    // switch (subscription.plan) {
    //   case PlanType.PRO:
    //     newPlan = PlanType.BASIC;
    //     break;
    //   case PlanType.ENTERPRISE:
    //     newPlan = PlanType.PRO;
    //     break;
    //   default:
    //     return reply.status(400).send({ error: 'Your plan is already BASIC' });
    // }

    // const updatedSubscription = await prisma.subscription.update({
    //   where: { userId },
    //   data: {
    //     plan: newPlan,
    //     expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    //   },
    // });

    const res = await downgradeService(userId);

    return reply.status(200).send({
      plan: res.plan,
    });
  } catch (err) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
