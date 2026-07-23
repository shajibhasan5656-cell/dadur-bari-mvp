import { NextResponse } from "next/server";
import { getMvpOrders, updateMvpOrder } from "@/lib/mvp-orders";

export async function GET() {
  try {
    const orders = await getMvpOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, orders: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await updateMvpOrder(
      body.id,
      body.status || "pending",
      body.payment_status || "awaiting_verification"
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Order update failed" },
      { status: 500 }
    );
  }
}
