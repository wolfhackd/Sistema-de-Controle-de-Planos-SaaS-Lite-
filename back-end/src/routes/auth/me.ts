import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const me = async (req: FastifyRequest, reply: FastifyReply) => {
  await req.jwtVerify();

  try {
    // 🔐 valida token (assinatura + expiração)
    await req.jwtVerify();

    const userId = (req.user as any).sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    return reply.send({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.subscription?.plan ?? 'BASIC',
    });
  } catch {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};
