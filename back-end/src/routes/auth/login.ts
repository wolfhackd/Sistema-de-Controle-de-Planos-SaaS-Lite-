import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import bcrypt from 'bcryptjs';
import { loginUserService, type LoginBodyInput } from '../../services/auth/loginUserService.js';

export const loginUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const res = await loginUserService(req.body as LoginBodyInput);
    const token = await req.server.jwt.sign({ sub: res.userId }, { expiresIn: '1d' });
    reply.send({ token });
  } catch (err: any) {
    if (err.message === 'Empty email or password') {
      return reply.status(400).send({ error: 'Email and password are required' });
    }
    if (err.message === 'User not found') {
      return reply.status(404).send({ error: 'User not found' });
    }
    if (err.message === 'Invalid password') {
      return reply.status(401).send({ error: 'Invalid password' });
    }
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
