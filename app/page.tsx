import CategoryList from "@/components/homePage/CategoryList";
import MainCarousel from "@/components/homePage/MainCarousel";
import ScrollableList from "@/components/homePage/ScrollableList";
import { getData } from "@/services/getData";

export default async function Home() {
  const dataCat = await getData("/api/categories");
  const dataBrands = await getData("/api/brands");

  return (
    <div>
      <MainCarousel categories={dataCat.categories} />
      <CategoryList categories={dataCat.categories} />
      <ScrollableList data={dataBrands.brands} title="brand" />
    </div>
  );
}
