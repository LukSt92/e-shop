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
  const params = new URLSearchParams(filterParams as Record<string, string>);
  const dataCat = await getData("/api/categories");
  const { products, page, totalPages } = await getData(
    `/api/products?${params.toString()}`
  );
  params.delete("page");
  const paginationUrl = `/product?${params.toString()}`;

  return (
    <div className="flex px-[40px]">
      <div className="w-1/5">
        <Filter data={dataCat.categories} />
      </div>
      <div className="w-4/5">
        <Sorter />
        <ProductGrid data={products} />
        <Pagination page={page} totalPages={totalPages} url={paginationUrl} />
      </div>
    </div>
  );
}
