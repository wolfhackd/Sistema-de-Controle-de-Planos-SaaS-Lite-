import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../prisma.js';

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();
}
