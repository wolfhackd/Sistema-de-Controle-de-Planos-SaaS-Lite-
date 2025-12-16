import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { PlanType, UserRole } from '../src/generated/prisma/client.js';

const seed = async () => {
  const password = process.env.ADMIN_PASSWORD!;
  if (!password) {
    throw new Error('ADMIN_PASSWORD is not set');
  }
  const passwordHash = await bcrypt.hashSync(password, 10);

  const adminEmail = process.env.ADMIN_EMAIL!;
  if (!adminEmail) {
    throw new Error('ADMIN_EMAIL is not set');
  }

  const adminExists = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (adminExists) {
    console.log('Admin already exists');
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: UserRole.ADMIN,
    },
  });

  await prisma.subscription.create({
    data: {
      userId: admin.id,
      plan: PlanType.ENTERPRISE,
      expiresAt: new Date(new Date().setFullYear(new Date().getFullYear() + 100)),
    },
  });
  console.log(`Admin created with id ${admin.id}`);
  return;
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
