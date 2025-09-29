import CategoryList from "@/components/homePage/CategoryList";
import MainCarousel from "@/components/homePage/MainCarousel";
import BrandList from "@/components/homePage/BrandList";
import RandomProductsList from "@/components/homePage/RandomProductsList";
import { prisma } from "@/lib/prisma";

export default async function HomePage({}) {
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  const shuffledProducts = products
    .map((p) => ({ sort: Math.random(), value: p }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
  const randomProducts = shuffledProducts.map((p) => ({
    ...p,
    price: p.price.toNumber(),
  }));

  return (
    <div>
      <MainCarousel categories={categories} />
      <CategoryList categories={categories} />
      <RandomProductsList data={randomProducts} title="recomendation" />
      <BrandList data={brands} title="brand" />
    </div>
  );
}
