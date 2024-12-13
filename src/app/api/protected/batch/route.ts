import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "your are Authenticated" });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
