import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartEmpty() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center py-8">
            <Card className="max-w-3xl bg-white shadow-md">
                <CardContent className="flex flex-col justify-center items-center py-8">
                    <div className="w-24 h-24 rounded-full border-4 border-red-600 flex justify-center items-center">
                        <Book className="w-12 h-12 text-red-600" />
                    </div>
                    <h3 className="text-center text-2xl font-semibold my-4 text-black">
                        Seu carrinho está vazio
                    </h3>
                    <p className="text-center text-lg text-gray-700">
                        Clique para voltar para a página inicial.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center py-8">
                    <Button
                        variant="outline"
                        className="border-red-600 text-red-600 hover:border-red-700 hover:text-red-700"
                        onClick={() => navigate('/')}
                    >
                        Página inicial
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
