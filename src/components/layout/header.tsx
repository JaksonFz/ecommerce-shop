import { useCart } from "@/cases/cart/hooks/Use-cart";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Header() {
    const { cart } = useCart();

    return (
        <header className="w-full border-b bg-white shadow-sm">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
                <div className="flex items-center gap-2">
                    <ShoppingCart className="text-green-600" />
                    <h1 className="text-lg font-bold">
                        <span className="font-light">Titulo</span>Shop
                    </h1>
                </div>

                <Link to="/cart" className="relative">
                    <Button variant="ghost" size="icon" className="relative hover:text-green-700">
                        <ShoppingCart />

                        {cart.items.length > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 bg-green-600 text-white font-bold flex items-center justify-center">
                                {cart.items.length}
                            </Badge>
                        )}
                    </Button>
                </Link>

            </div>
        </header>
    );
}
