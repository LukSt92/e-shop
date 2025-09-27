import Gallery from "@/components/productDetailsPage/Gallery";
import { getData } from "@/services/getData";

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  const product = await getData(`/api/products/${params.id}`);

  return (
    <div className="p-[40px]">
      <div>{/* TODO dodać breadcrumb!! */}</div>
      <div>
        <div>
          <div>
            <Gallery name={product.name} imageUrls={product.imageUrls} />
          </div>
          <div>Opis</div>
        </div>
        <div>Kolory ilość itd.</div>
      </div>
    </div>
  );
}
