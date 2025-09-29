import Filter from "@/components/productPage/Filter";
import Pagination from "@/components/productPage/Pagination";
import ProductGrid from "@/components/productPage/ProductGrid";
import Sorter from "@/components/productPage/Sorter";
import Breadcrumb from "@/components/shared/BreadCrumb";

export default async function Product({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const baseUrl = process.env.DB_HOST;
  const filterParams = searchParams;
  const params = new URLSearchParams(filterParams as Record<string, string>);
  const categories = await fetch(`${baseUrl}/api/categories`);
  const dataCat = await categories.json();
  const dataProducts = await fetch(
    `${baseUrl}/api/products?${params.toString()}`
  );
  const [products, page, totalPages] = await dataProducts.json();
  params.delete("page");
  const paginationUrl = `/product?${params.toString()}`;

  return (
    <div className="px-[40px]">
      <Breadcrumb />
      <div className="flex">
        <div className="w-1/5 min-w-[150px]">
          <Filter data={dataCat.categories} />
        </div>
        <div className="w-4/5">
          <Sorter />
          <ProductGrid data={products} />
          <Pagination page={page} totalPages={totalPages} url={paginationUrl} />
        </div>
      </div>
    </div>
  );
}
