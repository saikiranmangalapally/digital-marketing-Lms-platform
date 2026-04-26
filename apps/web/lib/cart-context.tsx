"use client";

import { createContext, useCallback, useContext, useEffect, useReducer, type ReactNode } from "react";
import { Course } from "@/lib/types";

type CartItem = Course & { qty: number };

type CartState = {
  items: CartItem[];
  plan: "individual" | "bundle" | "live";
  isHydrated: boolean;
};

type CartAction =
  | { type: "ADD_COURSE"; course: Course }
  | { type: "REMOVE_COURSE"; courseId: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_PLAN"; plan: CartState["plan"] }
  | { type: "HYDRATE"; state: CartState };

const STORAGE_KEY = "adyantra-lms-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_COURSE": {
      const exists = state.items.find((i) => i.id === action.course.id);
      if (exists) return state;
      return { ...state, items: [...state.items, { ...action.course, qty: 1 }] };
    }
    case "REMOVE_COURSE":
      return { ...state, items: state.items.filter((i) => i.id !== action.courseId) };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_PLAN":
      return { ...state, plan: action.plan };
    case "HYDRATE":
      return action.state;
    default:
      return state;
  }
}

const initialState: CartState = { items: [], plan: "individual", isHydrated: false };

type CartContextValue = CartState & {
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
  clearCart: () => void;
  setPlan: (plan: CartState["plan"]) => void;
  totalPrice: number;
  itemCount: number;
  isHydrated: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        dispatch({ type: "HYDRATE", state: { ...parsed, isHydrated: true } });
      } else {
        dispatch({ type: "HYDRATE", state: { ...initialState, isHydrated: true } });
      }
    } catch {
      dispatch({ type: "HYDRATE", state: { ...initialState, isHydrated: true } });
    }
  }, []);

  // persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const addCourse = useCallback((course: Course) => dispatch({ type: "ADD_COURSE", course }), []);
  const removeCourse = useCallback((courseId: string) => dispatch({ type: "REMOVE_COURSE", courseId }), []);
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const setPlan = useCallback((plan: CartState["plan"]) => dispatch({ type: "SET_PLAN", plan }), []);

  const totalPrice = state.items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = state.items.length;

  return (
    <CartContext.Provider value={{ ...state, addCourse, removeCourse, clearCart, setPlan, totalPrice, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
