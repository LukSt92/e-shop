import CategoryList from "@/components/homePage/CategoryList";
import MainCarousel from "@/components/homePage/MainCarousel";
import BrandList from "@/components/homePage/BrandList";
import { getData } from "@/services/getData";
import RandomProductsList from "@/components/homePage/RandomProductsList";

export default async function Home() {
  const dataCat = await getData("/api/categories");
  const dataBrands = await getData("/api/brands");
  const randomProducts = await getData("/api/products/random");

  return (
    <div>
      <MainCarousel categories={dataCat.categories} />
      <CategoryList categories={dataCat.categories} />
      <RandomProductsList data={randomProducts} title="recomendation" />
      <BrandList data={dataBrands.brands} title="brand" />
    </div>
  );
}
