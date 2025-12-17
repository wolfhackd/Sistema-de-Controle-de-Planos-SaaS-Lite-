import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../../prisma.js';
import { PlanType } from '../../generated/prisma/client.js';

export const planChange = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id, plan } = req.params as {
      id: string;
      plan: keyof typeof PlanType;
    };

    if (!Object.values(PlanType).includes(plan)) {
      return reply.status(400).send({
        error: 'Plano inválido',
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        subscription: {
          update: {
            plan: plan,
          },
        },
      },
    });

    return reply.send(updatedUser);
  } catch (error) {
    return reply.status(500).send({
      error: 'Erro ao alterar plano',
    });
  }
};
