import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartItem = {
  productId: number;
  title: string;
  price: number;     // en número
  unit?: string;
  imageSrc: string;
  qty: number;
};

type CartState = { items: CartItem[] };

type Action =
  | { type: "ADD"; payload: Omit<CartItem, "qty"> & { qty?: number } }
  | { type: "REMOVE"; payload: { productId: number } }
  | { type: "UPDATE_QTY"; payload: { productId: number; qty: number } }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  add: (p: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
} | null>(null);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "ADD": {
      const { productId, title, price, unit, imageSrc } = action.payload;
      const qty = Math.max(1, action.payload.qty ?? 1);
      const idx = state.items.findIndex(i => i.productId === productId);
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + qty };
        return { items };
      }
      return {
        items: [...state.items, { productId, title, price, unit, imageSrc, qty }]
      };
    }
    case "REMOVE": {
      return { items: state.items.filter(i => i.productId !== action.payload.productId) };
    }
    case "UPDATE_QTY": {
      const { productId, qty } = action.payload;
      if (qty <= 0) {
        return { items: state.items.filter(i => i.productId !== productId) };
      }
      return {
        items: state.items.map(i => (i.productId === productId ? { ...i, qty } : i)),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = "huertohogar_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartState) : { items: [] };
    } catch {
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // si aún usas la badge con id="cart-count"
    const el = document.getElementById("cart-count");
    if (el) el.textContent = String(state.items.reduce((s, i) => s + i.qty, 0));
  }, [state]);

  const value = useMemo(() => {
    const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
    const totalPrice = state.items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items: state.items,
      add: (p: Omit<CartItem, "qty">, qty = 1) => dispatch({ type: "ADD", payload: { ...p, qty } }),
      remove: (productId: number) => dispatch({ type: "REMOVE", payload: { productId } }),
      updateQty: (productId: number, qty: number) => dispatch({ type: "UPDATE_QTY", payload: { productId, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
      totalItems,
      totalPrice,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
