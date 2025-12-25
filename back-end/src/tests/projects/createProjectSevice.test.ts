import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../../prisma.js', () => ({
  prisma: {
    project: {
      create: vi.fn(),
    },
    usage: {
      update: vi.fn(),
    },
  },
}));

import { prisma } from '../../../prisma.js';
import { createProjectService } from '../../services/projects/createProjectService.js';

describe('createProjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um projeco com sucesso', async () => {
    vi.mocked(prisma.project.create).mockResolvedValue({
      id: 'project-1',
      name: 'Projeto 1',
    } as any);

    const result = await createProjectService({
      userId: 'user-1',
      name: 'Projeto 1',
    });

    expect(result).toEqual({
      id: 'project-1',
      name: 'Projeto 1',
    });

    expect(prisma.project.create).toHaveBeenCalledWith({
      data: {
        name: 'Projeto 1',
        user: {
          connect: {
            id: 'user-1',
          },
        },
      },
    });
    expect(prisma.usage.update).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      data: { projectsCount: { increment: 1 } },
    });
  });

  it('deve retornar um erro se o projeto não for criado', async () => {
    vi.mocked(prisma.project.create).mockResolvedValue(null as any);

    await expect(
      createProjectService({
        userId: 'user-1',
        name: 'Projeto Falho',
      }),
    ).rejects.toThrow(new Error('Error creating project'));
  });
});
