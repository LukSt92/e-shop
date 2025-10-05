import BagIcon from "@/components/icons/BagIcon";
import Breadcrumb from "@/components/shared/BreadCrumb";
import SignOutP from "@/components/shared/SignOutP";
import { auth } from "@/lib/auth";
import { ordersService } from "@/services/ordersService";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function ProfilePage({}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = parseInt(session.user.id);
  const orders = await ordersService.getUserOrders(userId);

  return (
    <div className="px-[40px]">
      <Breadcrumb />
      <div className="flex gap-x-[48px] max-[750px]:flex-col max-[750px]:gap-y-[30px]">
        <div className="w-[320px] p-[24px] bg-neutral-900 border border-border rounded-md max-h-fit">
          <div className="flex gap-x-[24px] pb-[24px] border-b border-border">
            <Image
              src={"/LionAvatar.svg"}
              alt="Avatar"
              height={72}
              width={72}
            />
            <div>
              <p className="text-neutral-50 text-[16px] font-medium pb-[4px]">
                {session?.user?.name}
              </p>
              <p className="text-neutral-100 text-[14px]">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <SignOutP />
        </div>
        <div className="flex flex-col w-auto grow">
          <div className="flex">
            <div className="flex w-1/2 border-b border-primary-400 pb-[12px] justify-center">
              <p className="text-primary-400 text-[18px] font-semibold">
                Transaction
              </p>
            </div>
            <div className="w-1/2"></div>
          </div>
          <div className="flex flex-col pt-[32px] gap-y-[16px]">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex gap-x-[16px] bg-neutral-900 border border-border rounded-md p-[16px]"
              >
                <BagIcon />
                <div>
                  <p className="text-[16px] text-neutral-100 pb-[14px]">
                    {order.createdAt.toLocaleString()}
                  </p>
                  <div className="flex flex-col text-[18px] text-neutral-50 font-medium gap-y-[4px]">
                    <p>{`Your order nr INV/${
                      order.id
                    }/${order.createdAt.getTime()}`}</p>
                    <ul className="flex flex-col list-disc ml-[22px]">
                      {order.items.map((product) => (
                        <li key={product.id}>{product.product.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
