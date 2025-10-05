import { prisma } from "@/lib/prisma";

export const categoriesService = {
  async getAll() {
    return await prisma.category.findMany();
  },
};
