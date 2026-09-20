import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body;

    // Check credentials strictly as specified by user
    if (username === "aralumina26" && password === "slugas007") {
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful.",
      });

      // Set auth cookie for 7 days
      response.cookies.set("slug_auth", "authenticated", {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials. Access denied." },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Server authentication error." },
      { status: 500 }
    );
  }
}
