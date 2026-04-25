import type { Role } from "@/lib/constants";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  vendorName: string;
  eta: string;
  image: string;
  featured?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

export interface CartItem {
  id: string;
  food: FoodItem;
  quantity: number;
}

export interface OrderSummary {
  id: string;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  total: number;
  placedAt: string;
  items: number;
}

export interface TeamUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Paused" | "Pending";
}

export const demoUser: UserSession = {
  id: "usr_1024",
  name: "Ava Johnson",
  email: "ava@bytebite.app",
  role: "user",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop",
};

export const demoCategories: Category[] = [
  { id: "cat_1", name: "Local Favourites", slug: "local-favourites" },
  { id: "cat_2", name: "Rice Dishes", slug: "rice-dishes" },
  { id: "cat_3", name: "Grills", slug: "grills" },
  { id: "cat_4", name: "Continental", slug: "continental" },
  { id: "cat_5", name: "Drinks", slug: "drinks" },
  { id: "cat_6", name: "Snacks", slug: "snacks" },
];

export const demoFoodItems: FoodItem[] = [
  {
    id: "food_1",
    name: "Waakye with Beef and Egg",
    description: "Classic waakye with beef stew, gari, shito, egg, and salad.",
    category: "Local Favourites",
    price: 42,
    rating: 4.9,
    vendorName: "Makola Kitchen",
    eta: "20 min",
    image: "https://images.unsplash.com/photo-1625937322998-3a7e2eac4f12?w=1200&q=80",
    featured: true,
  },
  {
    id: "food_2",
    name: "Banku and Tilapia",
    description: "Fresh grilled tilapia, banku, pepper, and kelewele on the side.",
    category: "Local Favourites",
    price: 55,
    rating: 4.8,
    vendorName: "Osu Bay Grill",
    eta: "25 min",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
  },
  {
    id: "food_3",
    name: "Chicken Jollof",
    description: "A generous Ghana-style jollof plate with fried chicken and coleslaw.",
    category: "Rice Dishes",
    price: 38,
    rating: 4.8,
    vendorName: "Legon Flame",
    eta: "18 min",
    image: "https://images.unsplash.com/photo-1633436375795-12b3a7b3b4b2?w=1200&q=80",
  },
  {
    id: "food_4",
    name: "Kelewele & Groundnuts",
    description: "Spiced ripe plantain, crunchy peanuts, and pepper sauce.",
    category: "Snacks",
    price: 18,
    rating: 4.7,
    vendorName: "Accra Street Snacks",
    eta: "12 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
  },
  {
    id: "food_5",
    name: "Pepperoni Pizza",
    description: "Cheesy pepperoni pizza baked hot and sliced for sharing.",
    category: "Continental",
    price: 78,
    rating: 4.6,
    vendorName: "City Oven",
    eta: "28 min",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
  },
  {
    id: "food_6",
    name: "Chicken Shawarma Wrap",
    description: "Grilled chicken shawarma with fries and garlic sauce.",
    category: "Continental",
    price: 35,
    rating: 4.7,
    vendorName: "East Legon Deli",
    eta: "16 min",
    image: "https://images.unsplash.com/photo-1533777324565-a040eb52fac1?w=1200&q=80",
  },
];

export const demoOrders: OrderSummary[] = [
  { id: "ord_3101", status: "Preparing", total: 117, placedAt: "Today, 12:16", items: 3 },
  { id: "ord_3096", status: "Delivered", total: 84, placedAt: "Yesterday, 18:42", items: 2 },
  { id: "ord_3089", status: "Cancelled", total: 38, placedAt: "Apr 20, 08:15", items: 1 },
];

export const demoUsers: TeamUser[] = [
  { id: "usr_101", name: "Ava Johnson", email: "ava@bytebite.app", role: "user", status: "Active" },
  { id: "usr_102", name: "Campus Grill", email: "orders@campusgrill.app", role: "vendor", status: "Active" },
  { id: "usr_103", name: "ByteBite Admin", email: "baginifred26@gmail.com", role: "admin", status: "Pending" },
];
