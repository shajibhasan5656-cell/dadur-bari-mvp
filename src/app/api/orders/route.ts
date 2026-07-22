import { NextResponse } from "next/server";
import { createMvpOrder } from "@/lib/mvp-orders";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const order = await createMvpOrder(data);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Order save failed" },
      { status: 500 }
    );
  }
}
