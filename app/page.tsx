import MainCarousel from "@/components/homePage/MainCarousel";
import { getData } from "@/services/getData";

export default async function Home() {
  const data = await getData("/api/categories");

  return (
    <div>
      <MainCarousel categories={data.categories} />
    </div>
  );
}
