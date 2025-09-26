import Filter from "@/components/productPage/Filter";
import Sorter from "@/components/productPage/Sorter";
import { getData } from "@/services/getData";

export default async function Product() {
  const dataCat = await getData("/api/categories");

  return (
    <div className="flex px-[40px]">
      <div className="w-1/5">
        <Filter data={dataCat.categories} />
      </div>
      <div className="w-4/5">
        <Sorter />
      </div>
    </div>
  );
}
