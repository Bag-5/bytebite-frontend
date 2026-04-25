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
  { id: "cat_1", name: "Bowls", slug: "bowls" },
  { id: "cat_2", name: "Burgers", slug: "burgers" },
  { id: "cat_3", name: "Pizza", slug: "pizza" },
  { id: "cat_4", name: "Healthy", slug: "healthy" },
  { id: "cat_5", name: "Drinks", slug: "drinks" },
];

export const demoFoodItems: FoodItem[] = [
  {
    id: "food_1",
    name: "Korean Chicken Bowl",
    description: "Crispy chicken, pickled vegetables, rice, sesame glaze.",
    category: "Bowls",
    price: 12.5,
    rating: 4.9,
    vendorName: "North Court Kitchen",
    eta: "18 min",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200&q=80",
    featured: true,
  },
  {
    id: "food_2",
    name: "Campus Smash Burger",
    description: "Double patty, cheddar, house pickles, silky sauce.",
    category: "Burgers",
    price: 10.75,
    rating: 4.8,
    vendorName: "Grill House",
    eta: "22 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
  },
  {
    id: "food_3",
    name: "Garden Power Salad",
    description: "Quinoa, avocado, roasted chickpeas, citrus dressing.",
    category: "Healthy",
    price: 9.9,
    rating: 4.7,
    vendorName: "Fresh Leaf",
    eta: "14 min",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
  },
  {
    id: "food_4",
    name: "Margherita Slice Box",
    description: "Stone-baked crust, mozzarella, tomato basil, olive oil.",
    category: "Pizza",
    price: 11.25,
    rating: 4.8,
    vendorName: "Slice Studio",
    eta: "20 min",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=1200&q=80",
  },
];

export const demoOrders: OrderSummary[] = [
  { id: "ord_3101", status: "Preparing", total: 24.5, placedAt: "Today, 12:16", items: 3 },
  { id: "ord_3096", status: "Delivered", total: 18.0, placedAt: "Yesterday, 18:42", items: 2 },
  { id: "ord_3089", status: "Cancelled", total: 8.5, placedAt: "Apr 20, 08:15", items: 1 },
];

export const demoUsers: TeamUser[] = [
  { id: "usr_101", name: "Ava Johnson", email: "ava@bytebite.app", role: "user", status: "Active" },
  { id: "usr_102", name: "Campus Grill", email: "orders@campusgrill.app", role: "vendor", status: "Active" },
  { id: "usr_103", name: "ByteBite Admin", email: "admin@bytebite.app", role: "admin", status: "Pending" },
];
