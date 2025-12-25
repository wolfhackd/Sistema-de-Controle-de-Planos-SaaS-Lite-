import { prisma } from '../../../prisma.js';

export async function listProjectsService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      projects: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (!user?.projects) {
    throw new Error('Projects not found');
  }

  return user.projects;
}
