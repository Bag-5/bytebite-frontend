import { NextResponse } from "next/server";
import { loginWithPassword, getAuthCookieOptions } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };

  if (!body.email || !body.password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  try {
    const auth = await loginWithPassword(body.email, body.password);
    const response = NextResponse.json({ user: auth.user });
    response.cookies.set(getAuthCookieOptions(auth.token));
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 401 }
    );
  }
}
