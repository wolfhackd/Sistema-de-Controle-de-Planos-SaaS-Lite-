import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/client.js';

export async function downgradeService(userId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
    select: { plan: true },
  });

  if (!subscription) {
    throw new Error('Subscription not found');
  }

  let newPlan: PlanType;

  switch (subscription.plan) {
    case PlanType.PRO:
      newPlan = PlanType.BASIC;
      break;
    case PlanType.ENTERPRISE:
      newPlan = PlanType.PRO;
      break;
    default:
      throw new Error('Your plan is already BASIC');
  }

  const updatedSubscription = await prisma.subscription.update({
    where: { userId },
    data: {
      plan: newPlan,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  return {
    plan: updatedSubscription.plan,
  };
}
