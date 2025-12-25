// import { beforeEach, describe, expect, it, vi } from 'vitest';

// vi.mock('../../../prisma.js', () => ({
//   prisma: {
//     project: {
//       findUnique: vi.fn(),
//       delete: vi.fn(),
//     },
//   },
// }));

// import { prisma } from '../../../prisma.js';
// import { deleteProjectService } from '../../services/projects/deleteProjectService.js';

// describe('DeleteProject', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('deve deletar um projeto', async () => {
//     vi.mocked(prisma.project.findUnique).mockResolvedValue({
//       id: 'project-1',
//       userId: 'user-1',
//     } as any);

//     vi.mocked(prisma.project.delete).mockResolvedValue({
//       id: 'project-1',
//       userId: 'user-1',
//     } as any);

//     const result = await deleteProjectService('user-1', 'project-1');

//     expect(result).toEqual({

//     })
//   });
// });
