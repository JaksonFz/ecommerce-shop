import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useEffect, useState, type ReactNode } from "react";
import { createContext } from "react";

export interface CartItem {
    product: ProductDTO;
    quantity: number;
}

export interface Cart {
    items: CartItem[];
}

type CartContextType = {
    cart: Cart;
    addProduct: (product: ProductDTO, quantity?: number) => void;
    removeProductCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    cartTotal: number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = { children: ReactNode };

export function CartContextProvider({ children }: CartContextProviderProps) {
    const [cart, setCart] = useState<Cart>({ items: [] });

    useEffect(() => {
        const storageCart = localStorage.getItem("cart");
        if (storageCart) {
            try {
                setCart(JSON.parse(storageCart));
            } catch {
                setCart({ items: [] });
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addProduct(product: ProductDTO, quantity: number = 1) {
        setCart((prevCart) => {
            const item = prevCart.items.find((i) => i.product.id === product.id);

            if (item) {
                return {
                    items: prevCart.items.map((i) =>
                        i.product.id === product.id
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    ),
                };
            }

            return {
                items: [...prevCart.items, { product, quantity }],
            };
        });
    }

    function updateQuantity(productId: string, quantity: number) {
        if (quantity < 1) return;

        setCart((prev) => ({
            items: prev.items.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            ),
        }));
    }

    function removeProductCart(productId: string) {
        setCart((prevCart) => ({
            items: prevCart.items.filter((i) => i.product.id !== productId),
        }));
    }

    const cartTotal = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addProduct,
                removeProductCart,
                updateQuantity,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
