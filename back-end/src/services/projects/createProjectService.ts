import { prisma } from '../../../prisma.js';

interface ProjectInput {
  userId: string;
  name: string;
}

export async function createProjectService(data: ProjectInput) {
  const userId = data.userId;
  const { name } = data;

  const newProject = await prisma.project.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });

  if (!newProject) {
    throw new Error('Error creating project');
  }

  await prisma.usage.update({
    where: { userId },
    data: {
      projectsCount: { increment: 1 },
    },
  });

  return {
    id: newProject.id,
    name: newProject.name,
  };
}
