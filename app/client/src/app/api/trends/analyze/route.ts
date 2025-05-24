import { BACKEND_URL } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { niche } = await request.json();

    // Make request to NestJS backend
    const response = await fetch(`${BACKEND_URL}/trends/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ niche }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error analyzing trends:", error);
    return NextResponse.json(
      { error: "Failed to analyze trends" },
      { status: 500 }
    );
  }
}
