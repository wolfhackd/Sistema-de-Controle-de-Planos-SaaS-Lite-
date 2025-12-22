import bcrypt from 'bcryptjs';
import { prisma } from '../../../prisma.js';

export interface LoginBodyInput {
  email: string;
  password: string;
}

export async function loginUserService(data: LoginBodyInput) {
  const { email, password } = data;

  if (!email || !password) {
    // return reply.status(400).send({ error: 'Email and password are required' });
    throw new Error('Empty email or password');
  }
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error('User not found');
  }

  const hashedPassword = bcrypt.compareSync(password, user.passwordHash);

  if (!hashedPassword) {
    throw new Error('Invalid password');
  }

  const userId = user.id;

  return { userId };
}
