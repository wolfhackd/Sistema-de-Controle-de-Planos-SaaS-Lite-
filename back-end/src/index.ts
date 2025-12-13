import Fastify from 'fastify';
import { prisma } from '../prisma.js';
import { authRoutes } from './routes/auth/route.js';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './routes/user/route.js';
const fastify = Fastify({
  logger: true,
});
//Config
// fastify.register(jwtPlugin);
fastify.register(fastifyJwt, {
  secret: process.env.TOKEN!,
});

//Routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(userRoutes, { prefix: '/user' });

try {
  await fastify.listen({ port: 3000 });
  console.log('listening on http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
