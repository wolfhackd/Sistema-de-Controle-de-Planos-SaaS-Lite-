import { beforeEach, describe, expect, it, test, vi } from 'vitest';

vi.mock('../../../prisma.js', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

import { meService } from '../../services/auth/meService.js';
import { prisma } from '../../../prisma.js';

describe('meService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar os dados do usuário junto com o plano', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1',
      name: 'Mauro',
      email: 'mauro@email.com',
      subscription: {
        plan: 'BASIC',
      },
    } as any);

    const result = await meService({ userId: 'user-1' });

    expect(result).toEqual({
      id: 'user-1',
      name: 'Mauro',
      email: 'mauro@email.com',
      plan: 'BASIC',
    });
  });
});
