import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  console.log("SePay IPN received:", payload);

  return NextResponse.json({
    success: true,
    message: "IPN received",
  });
}
