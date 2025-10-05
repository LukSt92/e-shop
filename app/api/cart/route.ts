import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { cartService } from "@/services/cartService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    await cartService.addToCart({
      userId,
      productId,
      quantity,
    });

    return NextResponse.json({
      message: "Product added to cart",
    });
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { message: error || "Internal error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    const cart = await cartService.getCart(userId);

    if (!cart) {
      return NextResponse.json(
        { message: "Cart is empty", cart: null },
        { status: 200 }
      );
    }

    return NextResponse.json(cart);
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, quantity, isSelect, isSelectAll } = body;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }
    const userId = parseInt(session.user.id);

    if (isSelect === undefined && isSelectAll === undefined) {
      if (!itemId || !quantity || quantity < 1) {
        return NextResponse.json({ message: "Invalid data" }, { status: 400 });
      }

      const updatedItem = await cartService.updateCartItem({
        userId,
        itemId,
        quantity,
      });
      return NextResponse.json(updatedItem);
    } else if (isSelectAll !== undefined && isSelect === undefined) {
      const updatedCart = await cartService.selectAllItems({
        userId,
        newSelect: isSelectAll,
      });

      return NextResponse.json(updatedCart);
    } else if (isSelectAll === undefined && isSelect !== undefined) {
      const updatedItem = await cartService.updateCartItem({
        userId,
        itemId,
        isSelect,
      });
      return NextResponse.json(updatedItem);
    }
  } catch (error) {
    console.error("PATCH /api/cart error:", error);
    return NextResponse.json(
      { message: error || "Internal error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId } = body;

    if (!itemId || isNaN(itemId)) {
      return NextResponse.json(
        { message: "Item do not exist" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized operation" },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    await cartService.removeFromCart({
      userId,
      itemId,
    });

    return NextResponse.json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { message: error || "Internal error" },
      { status: 500 }
    );
  }
}
