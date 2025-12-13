import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import bcrypt from 'bcryptjs';

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = req.body as RegisterBody;

  if (!name || !email || !password) {
    return reply.status(400).send({ error: 'Name, email and password are required' });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const res = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
  if (!res) {
    return reply.status(500).send({ error: 'Error creating user' });
  }
  await prisma.subscription.create({
    data: {
      userId: res.id,
      plan: 'BASIC',
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
  });

  await prisma.usage.create({
    data: {
      userId: res.id,
      requestsCount: 0,
      projectsCount: 0,
    },
  });

  return res;
};
