export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err.message, "Adding to cart failed.");
    }

    const result = await res.json();
    return result;
  } catch (e) {
    console.log(e, "addTocart function failed.");
  }
}

//TODO dodać notyfikacje!!
