import CategoryList from "@/components/homePage/CategoryList";
import MainCarousel from "@/components/homePage/MainCarousel";
import BrandList from "@/components/homePage/BrandList";
import RandomProductsList from "@/components/homePage/RandomProductsList";
import { categoriesService } from "@/services/categoriesService";
import { brandsService } from "@/services/brandsService";
import { productsService } from "@/services/productsService";

export default async function HomePage({}) {
  const categories = await categoriesService.getAll();
  const brands = await brandsService.getAll();
  const randomProducts = await productsService.getShuffled(6);

  return (
    <div>
      <MainCarousel categories={categories} />
      <CategoryList categories={categories} />
      <RandomProductsList data={randomProducts} title="recomendation" />
      <BrandList data={brands} title="brand" />
    </div>
  );
}
