import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ordersService } from "@/services/ordersService";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    const order = await ordersService.createOrder({ userId });

    return NextResponse.json(
      {
        message: "Order has been created",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { message: error || "Error while creating order" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

    const orders = await ordersService.getUserOrders(userId);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { message: "Error while fetching orders" },
      { status: 500 }
    );
  }
}
