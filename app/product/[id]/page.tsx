import Detailer from "@/components/productDetailsPage/Detailer";
import Gallery from "@/components/productDetailsPage/Gallery";
import { ProductDesc } from "@/components/productDetailsPage/ProductDesc";
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
    <div className="p-[40px]">
      <div>{/* TODO dodać breadcrumb!! */}</div>
      <div className="flex justify-between gap-x-[32px]">
        <Gallery name={product.name} imageUrls={product.imageUrls} />
        <ProductDesc
          name={product.name}
          category={product.category.name}
          desc={product.description}
          price={product.price}
          deliveryDay={deliveryDay}
        />
        <Detailer stock={product.stock} price={product.price} />
      </div>
    </div>
  );
}
