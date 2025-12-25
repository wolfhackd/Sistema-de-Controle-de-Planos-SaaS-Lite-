import { prisma } from '../../../prisma.js';

export async function deleteProjectService(userId: string, projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project || project.userId !== userId) {
    throw new Error('Project not found or not authorized to delete');
  }

  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });
}
