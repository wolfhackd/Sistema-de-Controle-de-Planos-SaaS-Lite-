import type { FastifyInstance } from 'fastify';
import { registerUser } from './register.js';
import { loginUser } from './login.js';
import { me } from './me.js';

export const authRoutes = (app: FastifyInstance) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  app.get('/me', me);
};
