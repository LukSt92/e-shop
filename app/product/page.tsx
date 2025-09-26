import Filter from "@/components/productPage/Filter";
import Pagination from "@/components/productPage/Pagination";
import ProductGrid from "@/components/productPage/ProductGrid";
import Sorter from "@/components/productPage/Sorter";
import { getData } from "@/services/getData";

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filterParams = await searchParams;
  const params = new URLSearchParams(
    filterParams as Record<string, string>
  ).toString();
  const dataCat = await getData("/api/categories");
  const filteredProducts = await getData(`/api/products?${params}`);

  return (
    <div className="flex px-[40px]">
      <div className="w-1/5">
        <Filter data={dataCat.categories} />
      </div>
      <div className="w-4/5">
        <Sorter />
        <ProductGrid data={filteredProducts} />
        <Pagination page={2} totalPages={5} url={"test"} />
      </div>
    </div>
  );
}
