import type { FastifyInstance } from 'fastify';
import { registerUser } from './register.js';
import { loginUser } from './login.js';
import { me } from './me.js';
import { authMiddleware } from '../../middleware/auth.js';

export const authRoutes = (app: FastifyInstance) => {
  app.post('/register', registerUser); //Reprojetado falta testar
  app.post('/login', loginUser); //Reprojetado falta testar
  app.get('/me', { preHandler: authMiddleware }, me); //Reprojetado falta testar
};
