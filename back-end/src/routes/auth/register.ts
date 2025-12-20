import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  registerUserService,
  type RegisterUserInput,
} from '../../services/auth/registerUserService.js';

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const { name, email, password } = req.body as RegisterUserInput;

  try {
    const user = await registerUserService(req.body as RegisterUserInput);
  } catch (err: any) {
    if (err.message === 'MISSING_FIELDS') {
      return reply.status(400).send({ error: 'Name, email and password are required' });
    }
    if (err.message === 'USER_ALREADY_EXISTS') {
      return reply.status(400).send({ error: 'User already exists' });
    }
    return reply.status(500).send({ error: 'Internal server error' });
  }
};
