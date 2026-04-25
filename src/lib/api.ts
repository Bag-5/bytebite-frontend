import { demoCategories, demoFoodItems, demoOrders, demoUser, type Category, type FoodItem, type OrderSummary, type UserSession } from "@/lib/mock";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
export const apiBaseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/$/, "") : "";

export function hasApiBaseUrl() {
  return Boolean(apiBaseUrl);
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) {
    return undefined as T;
  }
  return JSON.parse(text) as T;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  const response = await fetch(`${apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }

  return parseJson<T>(response);
}

export async function getDemoSession(): Promise<UserSession> {
  return demoUser;
}

export async function getDemoCategories(): Promise<Category[]> {
  return demoCategories;
}

export async function getDemoFoods(): Promise<FoodItem[]> {
  return demoFoodItems;
}

export async function getDemoOrders(): Promise<OrderSummary[]> {
  return demoOrders;
}
