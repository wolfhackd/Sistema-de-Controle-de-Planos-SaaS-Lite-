import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';

vi.mock('../../../prisma.js', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
      create: vi.fn(),
    },
    subscription: {
      create: vi.fn(),
    },
    usage: {
      create: vi.fn(),
    },
  },
}));

import { prisma } from '../../../prisma.js';
import { registerUserService } from '../../services/auth/registerUserService.js';

vi.spyOn(bcrypt, 'hashSync').mockReturnValue('hashed-password');

describe('registerUserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um usuário com sucesso', async () => {
    vi.mocked(prisma.user.findFirst).mockResolvedValue(null);

    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 'user-1',
      name: 'Mauro',
      email: 'mauro@email.com',
      passwordHash: 'hashed-password',
    } as any);

    const user = await registerUserService({
      name: 'Mauro',
      email: 'mauro@email.com',
      password: '123456',
    });

    expect(user.id).toBe('user-1');
    expect(prisma.user.create).toHaveBeenCalled();
    expect(prisma.subscription.create).toHaveBeenCalled();
    expect(prisma.usage.create).toHaveBeenCalled();
  });
  it('deve lançar erro se faltar campos obrigatórios', async () => {
    await expect(
      registerUserService({
        name: '',
        email: '',
        password: '',
      }),
    ).rejects.toThrow('MISSING_FIELDS');
  });
  it('não deve permitir email duplicado', async () => {
    vi.mocked(prisma.user.findFirst).mockResolvedValue({
      id: 'existing-user',
    } as any);

    await expect(
      registerUserService({
        name: 'Mauro',
        email: 'mauro@email.com',
        password: '123456',
      }),
    ).rejects.toThrow('USER_ALREADY_EXISTS');
  });
});
