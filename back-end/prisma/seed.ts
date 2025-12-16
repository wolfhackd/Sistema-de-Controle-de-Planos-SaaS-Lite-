import { prisma } from "../prisma.js"

const seed = async ()=>{
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'L2b0M@example.com',
      // role: 'ADMIN'
  })
}