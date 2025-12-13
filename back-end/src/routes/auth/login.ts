import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import bcrypt from 'bcryptjs';

interface LoginBody {
  email: string;
  password: string;
}

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as LoginBody;

  if (!email || !password) {
    return reply.status(400).send({ error: 'Email and password are required' });
  }
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }

  const hashedPassword = bcrypt.compareSync(password, user.passwordHash);

  if (!hashedPassword) {
    return reply.status(401).send({ error: 'Invalid password' });
  }

  const token = req.server.jwt.sign({ sub: user.id }, { expiresIn: '1d' });

  return { token };
};
