import Fastify from 'fastify';
import { prisma } from '../prisma.js';
import { authRoutes } from './routes/auth/route.js';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './routes/user/route.js';
import { projectsRoute } from './routes/projects/route.js';
const fastify = Fastify({
  logger: true,
});
//Config
// fastify.register(jwtPlugin);
fastify.register(fastifyJwt, {
  secret: process.env.TOKEN!,
});

const PORT = Number(process.env.PORT) || 3000;

//Routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(userRoutes, { prefix: '/user' });
fastify.register(projectsRoute);

try {
  await fastify.listen({ port: PORT });
  console.log(`listening on http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
