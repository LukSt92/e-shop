import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import Filter from "@/components/productPage/Filter";
import ProductGrid from "@/components/productPage/ProductGrid";
import Sorter from "@/components/productPage/Sorter";
import Breadcrumb from "@/components/shared/BreadCrumb";
import Button from "@/components/shared/Button";
import { categoriesService } from "@/services/categoriesService";
import { productsService } from "@/services/productsService";
import Link from "next/link";

type SearchParams = {
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: "latest" | "asc" | "desc";
  page?: string;
  show?: string;
};

type ProductsPageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categoryIds = params.categoryId?.split(" ").map((id) => parseInt(id));
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const sortBy = params.sortBy || "latest";
  const page = Number(params.page) || 1;
  const show = Number(params.show) || 3;

  const categories = await categoriesService.getAll();
  const { products, totalPages } = await productsService.getAll({
    categoryIds,
    minPrice,
    maxPrice,
    sortBy,
    page,
    show,
  });

  return (
    <div className="px-[40px]">
      <Breadcrumb />
      <div className="flex">
        <div className="w-1/5 min-w-[150px]">
          <Filter data={categories} />
        </div>
        <div className="w-4/5">
          <Sorter />
          <ProductGrid data={products} />
          <div className="flex items-center justify-between max-[1030px]:flex-col pb-[40px]">
            <div className="flex justify-start px-[40px] gap-[8px] flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link key={p} href={`/product?page=${p}&show=${show}`}>
                  <div
                    className={`rounded-md flex items-center justify-center text-[16px] cursor-pointer w-[44px] h-[44px] ${
                      p === page
                        ? "bg-primary-500 text-neutral-900"
                        : "text-neutral-500"
                    }`}
                  >
                    {p}
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex gap-x-[32px]">
              <Link href={`product?&page=${page > 1 ? page - 1 : 1}`}>
                <Button style="stroke" size="XL">
                  <ArrowLeftIcon color="#EE701D" />
                  Previous
                </Button>
              </Link>
              <Link
                href={`product&page=${
                  page < totalPages ? page + 1 : totalPages
                }`}
              >
                <Button style="stroke" size="XL">
                  Next
                  <ArrowRightIcon color="#EE701D" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
