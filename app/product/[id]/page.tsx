import Detailer from "@/components/productDetailsPage/Detailer";
import Gallery from "@/components/productDetailsPage/Gallery";
import { ProductDesc } from "@/components/productDetailsPage/ProductDesc";
import Breadcrumb from "@/components/shared/BreadCrumb";
import Loader from "@/components/shared/Loader";
import { productsService } from "@/services/productsService";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  let result;
  try {
    result = await productsService.getById(Number(id));
  } catch (error) {
    console.error(error);
    notFound();
  }

  const { product, deliveryDay } = result;

  return (
    <div className="px-[40px]">
      <Suspense fallback={<Loader />}>
        <Breadcrumb productName={product.name} />
        <div className="flex justify-between gap-[32px] max-[1080px]:flex-col">
          <div className="flex justify-between gap-[32px] max-[800px]:flex-col">
            <Gallery name={product.name} imageUrls={product.imageUrls} />
            <ProductDesc
              name={product.name}
              category={product.category.name}
              desc={product.description}
              price={product.price}
              deliveryDay={deliveryDay}
            />
          </div>
          <Detailer
            stock={product.stock}
            price={product.price}
            id={product.id}
          />
        </div>
      </Suspense>
    </div>
  );
}
