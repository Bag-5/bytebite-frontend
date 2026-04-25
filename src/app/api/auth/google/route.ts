import { NextResponse } from "next/server";
import { getAuthCookieOptions, loginWithGoogle } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { credential?: string };

  if (!body.credential) {
    return NextResponse.json({ message: "Google credential is required." }, { status: 400 });
  }

  try {
    const auth = await loginWithGoogle(body.credential);
    const response = NextResponse.json({ user: auth.user });
    response.cookies.set(getAuthCookieOptions(auth.token));
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Google sign-in failed." },
      { status: 400 }
    );
  }
}
