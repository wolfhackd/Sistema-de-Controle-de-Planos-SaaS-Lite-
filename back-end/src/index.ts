import Fastify from 'fastify';
import { authRoutes } from './routes/auth/authRoutes.js';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './routes/user/route.js';
import { projectsRoute } from './routes/projects/route.js';
import { adminRoutes } from './routes/admin/route.js';

import { fastifySwaggerUi } from '@fastify/swagger-ui';
import fastifySwagger from '@fastify/swagger';
const fastify = Fastify({
  logger: true,
});
//Config

fastify.register(fastifyJwt, {
  secret: process.env.TOKEN!,
});

fastify.register(fastifySwagger);

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

const PORT = Number(process.env.PORT) || 3000;

//Fazer documentação e focar em testes unitários

//Routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(userRoutes, { prefix: '/user' });
fastify.register(projectsRoute, { prefix: '/projects' });
//Middleware  de verificação de admin
fastify.register(adminRoutes, { prefix: '/admin' });

try {
  await fastify.ready();
  await fastify.listen({ port: PORT });
  console.log(`listening on http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
