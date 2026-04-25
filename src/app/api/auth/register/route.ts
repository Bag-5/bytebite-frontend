import { NextResponse } from "next/server";
import { getAuthCookieOptions, registerWithPassword } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { name?: string; email?: string; password?: string };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ message: "Name, email, and password are required." }, { status: 400 });
  }

  try {
    const auth = await registerWithPassword(body.name, body.email, body.password);
    const response = NextResponse.json({ user: auth.user });
    response.cookies.set(getAuthCookieOptions(auth.token));
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to create account." },
      { status: 400 }
    );
  }
}
