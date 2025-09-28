import Detailer from "@/components/productDetailsPage/Detailer";
import Gallery from "@/components/productDetailsPage/Gallery";
import { ProductDesc } from "@/components/productDetailsPage/ProductDesc";
import Breadcrumb from "@/components/shared/BreadCrumb";
import { getData } from "@/services/getData";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const { product, deliveryDay } = await getData(`/api/products/${id}`);

  console.log(product.category);

  return (
    <div className="px-[40px]">
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
        <Detailer stock={product.stock} price={product.price} id={product.id} />
      </div>
    </div>
  );
}
