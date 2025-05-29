import { ClerkUserUpdate } from '@/types/user.type';
import { PrismaClient } from '@prisma/client';
// import { ClerkUserUpdate } from '../../../types/user.type'

const prisma = new PrismaClient();

const upsertUser = async (user: ClerkUserUpdate) => {
  return prisma.user.upsert({
    where: { clerkUserId: user.clerkUserId },
    update: { ...user, clerkUserId: undefined },
    create: user,
  });
};

const deleteUser = async (clerkUserId: string) => {
  return prisma.user.update({
    where: { clerkUserId },
    data: { deletedAt: new Date() },
  });
};

const getUserByClerkId = async (clerkId: string) => {
  return prisma.user.findUnique({
    where: { clerkUserId: clerkId },
  });
};

export { deleteUser, getUserByClerkId, upsertUser };
