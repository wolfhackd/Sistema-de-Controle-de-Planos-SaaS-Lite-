import { prisma } from '../../../prisma.js';

export async function meService(data: { userId: string }) {
  const { userId } = data;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.subscription?.plan ?? 'BASIC',
  };
}
