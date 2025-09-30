import Detailer from "@/components/productDetailsPage/Detailer";
import Gallery from "@/components/productDetailsPage/Gallery";
import { ProductDesc } from "@/components/productDetailsPage/ProductDesc";
import Breadcrumb from "@/components/shared/BreadCrumb";
import Loader from "@/components/shared/Loader";
import { Product } from "@/lib/types";
import { Suspense } from "react";

type Params = { id: string };

export default async function ProductDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const baseUrl = process.env.DB_HOST;
  const { id } = await params;

  const res = await fetch(`${baseUrl}/api/products/${id}`);
  const data = await res.json();
  const productData: Product = data.product;

  return (
    <div className="px-[40px]">
      <Suspense fallback={<Loader />}>
        <Breadcrumb productName={productData.name} />
        <div className="flex justify-between gap-[32px] max-[1080px]:flex-col">
          <div className="flex justify-between gap-[32px] max-[800px]:flex-col">
            <Gallery
              name={productData.name}
              imageUrls={productData.imageUrls}
            />
            <ProductDesc
              name={productData.name}
              category={productData.category.name}
              desc={productData.description}
              price={productData.price}
              deliveryDay={"test"}
            />
          </div>
          <Detailer
            stock={productData.stock}
            price={productData.price}
            id={productData.id}
          />
        </div>
      </Suspense>
    </div>
  );
}
