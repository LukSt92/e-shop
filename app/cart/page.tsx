import CartProducts from "@/components/cartPage/CartProducts";
import CartDetailer from "@/components/cartPage/CartDetailer";
import Breadcrumb from "@/components/shared/BreadCrumb";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cartService } from "@/services/cartService";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = parseInt(session.user.id);

  const cart = await cartService.getCart(userId);
  const total = await cartService.getCartTotal(userId);
  const count = await cartService.getCartItemCount(userId);

  if (!cart || cart.items.length === 0)
    return (
      <p className="flex justify-center py[40px] text-[28px] text-neutral-50 font-semibold text-center px-[40px]">
        No products to display! Add some products to cart.
      </p>
    );

  const isChecked = cart.items.every((item) => item.isSelect === true);

  return (
    <div className="px-[40px]">
      <Breadcrumb />
      <div className="flex justify-between gap-[64px] max-[1200px]:flex-col">
        <CartProducts cart={cart} isChecked={isChecked} />
        <CartDetailer totalPrice={total} totalQuantity={count} />
      </div>
    </div>
  );
}
