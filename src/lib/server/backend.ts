import { cookies } from "next/headers";
import { apiBaseUrl, hasApiBaseUrl } from "@/lib/api";
import type { Category, FoodItem, OrderSummary, TeamUser, UserSession } from "@/lib/mock";
import { demoCategories, demoFoodItems, demoOrders, demoUser, demoUsers } from "@/lib/mock";

const authCookieName = "bytebite_token";

export function getAuthCookieName() {
  return authCookieName;
}

export async function getAuthToken() {
  const store = await cookies();
  return store.get(authCookieName)?.value ?? null;
}

function normalizeList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    for (const key of ["items", "data", "results", "foods", "orders", "categories", "users"]) {
      const value = record[key];
      if (Array.isArray(value)) {
        return value as T[];
      }
    }
  }

  return [];
}

function normalizeObject<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  if (record.user && typeof record.user === "object") {
    return record.user as T;
  }

  if (record.data && typeof record.data === "object" && !Array.isArray(record.data)) {
    const nested = record.data as Record<string, unknown>;
    if (nested.user && typeof nested.user === "object") {
      return nested.user as T;
    }
    return record.data as T;
  }

  return payload as T;
}

async function fetchJson(path: string, init?: RequestInit) {
  if (!hasApiBaseUrl()) {
    throw new Error("API base URL is not configured.");
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

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === "object" && "message" in payload && String((payload as Record<string, unknown>).message)) ||
      text ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function requestFirstMatch<T>(paths: string[], init?: RequestInit) {
  let lastError: unknown = null;

  for (const path of paths) {
    try {
      return (await fetchJson(path, init)) as T;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Request failed.");
}

export async function getSession(): Promise<UserSession | null> {
  const token = await getAuthToken();
  if (!token) {
    return hasApiBaseUrl() ? null : demoUser;
  }

  try {
    const payload = await requestFirstMatch<unknown>(["/auth/me", "/api/auth/me", "/me", "/profile"], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return normalizeObject<UserSession>(payload);
  } catch {
    return null;
  }
}

export async function getFoods(): Promise<FoodItem[]> {
  try {
    const payload = await requestFirstMatch<unknown>(["/foods", "/api/foods", "/menu", "/api/menu"]);
    const list = normalizeList<FoodItem>(payload);
    return list.length ? list : demoFoodItems;
  } catch {
    return demoFoodItems;
  }
}

export async function getFoodById(id: string): Promise<FoodItem | null> {
  try {
    const payload = await requestFirstMatch<unknown>([`/foods/${id}`, `/api/foods/${id}`, `/menu/${id}`]);
    return normalizeObject<FoodItem>(payload);
  } catch {
    return demoFoodItems.find((item) => item.id === id) ?? null;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const payload = await requestFirstMatch<unknown>(["/categories", "/api/categories", "/menu/categories"]);
    const list = normalizeList<Category>(payload);
    return list.length ? list : demoCategories;
  } catch {
    return demoCategories;
  }
}

export async function getOrders(): Promise<OrderSummary[]> {
  try {
    const payload = await requestFirstMatch<unknown>(["/orders", "/api/orders", "/orders/me", "/api/orders/me"]);
    const list = normalizeList<OrderSummary>(payload);
    return list.length ? list : demoOrders;
  } catch {
    return demoOrders;
  }
}

export async function getUsers(): Promise<TeamUser[]> {
  try {
    const payload = await requestFirstMatch<unknown>(["/admin/users", "/api/admin/users", "/users", "/api/users"]);
    const list = normalizeList<TeamUser>(payload);
    return list.length ? list : demoUsers;
  } catch {
    return demoUsers;
  }
}
