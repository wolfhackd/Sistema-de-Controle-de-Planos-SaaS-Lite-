import { beforeEach, expect, vi, describe, it } from 'vitest';
import bcrypt from 'bcryptjs';
import { loginUserService } from '../../services/auth/loginUserService.js';

vi.mock('../../../prisma.js', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from '../../../prisma.js';

describe('loginUserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve retornar o userId', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1',
      name: 'Mauro',
      email: 'mauro@email.com',
      passwordHash: 'hashed-password',
    } as any);

    vi.spyOn(bcrypt, 'compareSync').mockReturnValue(true);

    const result = await loginUserService({ email: 'mauro@email.com', password: '123456' });

    expect(result.userId).toBe('user-1');
  });

  it('deve lançar um erro se o email ou senha estiverem vazios', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 'user-1',
      passwordHash: 'hashed-password',
    } as any);

    vi.spyOn(bcrypt, 'compareSync').mockReturnValue(false);

    await expect(
      loginUserService({ email: 'mauro@email.com', password: 'errado' }),
    ).rejects.toThrow('Invalid password');
  });
});
