import Fastify from 'fastify';
import { authRoutes } from './routes/auth/route.js';
import fastifySwagger from '@fastify/swagger';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './routes/user/route.js';
import { projectsRoute } from './routes/projects/route.js';
import { adminRoutes } from './routes/admin/route.js';
const fastify = Fastify({
  logger: true,
});
//Config

fastify.register(fastifyJwt, {
  secret: process.env.TOKEN!,
});

const PORT = Number(process.env.PORT) || 3000;

//Fazer documentação e focar em testes unitários

//Routes
fastify.register(authRoutes, { prefix: '/auth' });
fastify.register(userRoutes, { prefix: '/user' });
fastify.register(projectsRoute);
//Middleware  de verificação de admin
fastify.register(adminRoutes, { prefix: '/admin' });

try {
  await fastify.listen({ port: PORT });
  console.log(`listening on http://localhost:${PORT}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
