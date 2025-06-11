"use client"

import { api } from "@/lib/api";
import { generateRandomString } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextProps{
    cartCode: string | null;
    cartItemsCount: number;
    setCartItemsCount: React.Dispatch<React.SetStateAction<number>>;
    clearCartCode: () => void;
}

const CartContext = createContext <CartContextProps | null>(null)


export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartCode, setCartCode] = useState<string | null>(null)
    const [cartItemsCount, setCartItemsCount] = useState(0)


    useEffect(() => {
        async function getCartItemsCount() {
        if (!cartCode) return; // ⛔ prevent premature API call

        try {
            const response = await api.get(`get_cart_stat?cart_code=${cartCode}`)
            setCartItemsCount(response.data.num_of_items)
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Error getting cart items count:", err.message)
                // optionally: reset cartCode if invalid
                // clearCartCode()
            } else {
                console.error("Unknown error occurred")
            }
        }
    }

        getCartItemsCount()
    }, [cartCode]);


    useEffect(() => {
        let code = localStorage.getItem("cartcode")
        if(!code) {
            code = generateRandomString()
            localStorage.setItem("cartcode", code)
        }
        setCartCode(code)
    }, [])

    function clearCartCode() {
        localStorage.removeItem("cartcode")
        setCartCode(null)
    }

    return (
        <CartContext.Provider value={{ cartCode, cartItemsCount, setCartItemsCount, clearCartCode }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used with a CartProvider")
    return context
}