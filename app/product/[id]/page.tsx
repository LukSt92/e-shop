import Detailer from "@/components/productDetailsPage/Detailer";
import Gallery from "@/components/productDetailsPage/Gallery";
import { ProductDesc } from "@/components/productDetailsPage/ProductDesc";
import Breadcrumb from "@/components/shared/BreadCrumb";
import Loader from "@/components/shared/Loader";
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
  const productData = data[0];

  return (
    <div className="px-[40px]">
      <Suspense fallback={<Loader />}>
        <Breadcrumb productName={productData.product.name} />
        <div className="flex justify-between gap-[32px] max-[1080px]:flex-col">
          <div className="flex justify-between gap-[32px] max-[800px]:flex-col">
            <Gallery
              name={productData.product.name}
              imageUrls={productData.product.imageUrls}
            />
            <ProductDesc
              name={productData.product.name}
              category={productData.product.category.name}
              desc={productData.product.description}
              price={productData.product.price}
              deliveryDay={productData.deliveryDay}
            />
          </div>
          <Detailer
            stock={productData.product.stock}
            price={productData.product.price}
            id={productData.product.id}
          />
        </div>
      </Suspense>
    </div>
  );
}
