import { NextResponse } from "next/server";
import { apiBaseUrl } from "@/lib/api";
import { getAuthCookieName } from "@/lib/server/backend";

async function proxy(request: Request, params: Promise<{ path: string[] }>) {
  if (!apiBaseUrl) {
    return NextResponse.json({ message: "NEXT_PUBLIC_API_BASE_URL is not configured." }, { status: 500 });
  }

  const { path } = await params;
  const target = `${apiBaseUrl}/${path.map(encodeURIComponent).join("/")}`;
  const url = new URL(target);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");

  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${getAuthCookieName()}=([^;]+)`));
  if (match?.[1] && !headers.has("authorization")) {
    headers.set("authorization", `Bearer ${decodeURIComponent(match[1])}`);
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(url, init);
  const contentType = response.headers.get("content-type") ?? "application/json";
  const body = await response.arrayBuffer();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context.params);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context.params);
}

export async function PUT(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context.params);
}

export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context.params);
}

export async function DELETE(request: Request, context: { params: Promise<{ path: string[] }> }) {
  return proxy(request, context.params);
}
