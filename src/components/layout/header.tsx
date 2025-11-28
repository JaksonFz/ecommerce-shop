import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/cases/cart/hooks/use-cart";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "@/cases/auth/hooks/use-auth";

export function Header() {
    const { cart } = useCart();
    const [text, setText] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const q = text.trim();
        if (q.length === 0) {
            navigate("/");
            return;
        }
        navigate(`/ search ? q = ${encodeURIComponent(q)} `);
    }

    return (
        <header className="w-full border-b bg-black text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
                <div className="flex items-center gap-2">
                    <Book className="text-red-600" />
                    <h1 className="text-2xl font-bold">Librarium</h1>
                </div>

                <form onSubmit={handleSubmit} className="mx-4 w-80 flex-shrink-0">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Buscar livros..."
                        className="w-full border border-red-600 rounded-lg px-3 py-2 bg-white text-black"
                    />
                </form>

                <Link to="/cart" className="relative">
                    <Button variant="ghost" size="icon" className="relative text-white hover:text-red-500">
                        <Book />
                        {cart.items.length > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 bg-red-600 text-white font-bold flex items-center justify-center">
                                {cart.items.length}
                            </Badge>
                        )}
                    </Button>
                </Link>


                {!user && (
                    <Link to="/signin">
                        <Button variant="default" className="text-white">
                            Entrar
                        </Button>
                    </Link>
                )}

            </div>
        </header>
    );


}
