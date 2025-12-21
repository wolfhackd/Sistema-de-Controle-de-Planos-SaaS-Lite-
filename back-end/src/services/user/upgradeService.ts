import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/client.js';

export async function upgradeService(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    select: { plan: true },
  });

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  let newPlan: PlanType;

  switch (subscription.plan) {
    case PlanType.BASIC:
      newPlan = PlanType.PRO;
      break;
    case PlanType.PRO:
      newPlan = PlanType.ENTERPRISE;
      break;
    default:
      throw new Error('Your plan is already ENTERPRISE');
  }

  const updatedSubscription = await prisma.subscription.update({
    where: { userId },
    data: {
      plan: newPlan,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  return {
    message: 'Plan upgraded successfully',
    plan: updatedSubscription.plan,
  };
}
