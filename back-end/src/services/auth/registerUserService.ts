import bcrypt from 'bcryptjs';
import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/client.js';

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}
export async function registerUserService(data: RegisterUserInput) {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error('MISSING_FIELDS');
  }

  const userExists = await prisma.user.findFirst({
    where: { email },
  });

  if (userExists) {
    throw new Error('USER_ALREADY_EXISTS');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });

  await prisma.subscription.create({
    data: {
      userId: user.id,
      plan: PlanType.BASIC,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  await prisma.usage.create({
    data: {
      userId: user.id,
      requestsCount: 0,
      projectsCount: 0,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  });

  return user;
}
