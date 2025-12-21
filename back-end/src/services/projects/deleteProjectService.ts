import { prisma } from '../../../prisma.js';

export async function deleteProjectService(userId: string, projectId: string) {
  const deletedProject = await prisma.project.deleteMany({
    where: {
      id: projectId,
      userId: userId,
    },
  });

  if (deletedProject.count === 0) {
    throw new Error('Project not found or not authorized to delete');
  }
}
