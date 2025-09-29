"use client";
import Filter from "@/components/productPage/Filter";
import Pagination from "@/components/productPage/Pagination";
import ProductGrid from "@/components/productPage/ProductGrid";
import Sorter from "@/components/productPage/Sorter";
import Breadcrumb from "@/components/shared/BreadCrumb";
import { Category, type Product } from "@/lib/types";
import { getData } from "@/services/getData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginationUrl, setPaginationUrl] = useState<string>("");
  const useParams = useSearchParams();

  useEffect(() => {
    const setData = async () => {
      const params = new URLSearchParams(useParams);
      const dataCat = await getData("/api/categories");
      setCategories(dataCat.categories);
      const { products, page, totalPages } = await getData(
        `/api/products?${params.toString()}`
      );
      setProducts(products);
      setPage(page);
      setTotalPages(totalPages);
      params.delete("page");
      const paginationUrl = `/product?${params.toString()}`;
      setPaginationUrl(paginationUrl);
    };
    setData();
  }, [useParams]);

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
          <Pagination page={page} totalPages={totalPages} url={paginationUrl} />
        </div>
      </div>
    </div>
  );
}
