import { Button } from "@/components/ui/button";
import type { ProductDTO } from "../dtos/product.dto";
import { cn } from "@/lib/utils";
import { FormattedNumber, IntlProvider } from "react-intl";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../cart/hooks/use-cart";

type ProductDetailProps = {
    product: ProductDTO;
};

export function ProductDetail({ product }: ProductDetailProps) {
    const { addProduct } = useCart();
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
    const [selectedPhoto, setSelectedPhoto] = useState<number>(0);

    const photos = product.photos || [];
    const mainPhoto = photos[selectedPhoto];
    const mainImagePhoto = mainPhoto
        ? `${bucketBaseURL}${mainPhoto.path}`
        : `https://placehold.co/500x500?text=Sem+Imagem`;

    function handleAddProductCart() {
        addProduct(product);
    }

    return (
        <div className="w-full flex flex-col mt-10 lg:flex-row lg:gap-8">

            <div className="flex flex-col w-full max-w-2xl">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4 text-center lg:text-left">
                    {product.name}
                </h1>

                <div className="w-full h-[480px] bg-white rounded-xl shadow flex items-center justify-center overflow-hidden">
                    <img src={mainImagePhoto} className="w-full h-full object-contain" />
                </div>

                {photos.length > 1 && (
                    <ul className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center lg:justify-start">
                        {photos.map((photo, index) => (
                            <li key={photo.id}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-20 h-20 rounded-md border p-0",
                                        index === selectedPhoto ? "border-green-600" : "border-gray-300"
                                    )}
                                    onClick={() => setSelectedPhoto(index)}
                                >
                                    <img
                                        src={`${bucketBaseURL}${photo.path}`}
                                        className="w-full h-full object-contain rounded"
                                    />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="text-gray-700 leading-relaxed mt-6">
                    {product.description}
                </p>
            </div>

            <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 h-fit mt-8 lg:mt-0 flex flex-col gap-4">

                <p className="text-3xl font-bold text-green-600">
                    <IntlProvider locale="pt-BR">
                        <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="BRL"
                        />
                    </IntlProvider>
                </p>

                <p className="text-gray-600 text-sm">
                    Receba em casa com segurança ou retire na loja.
                </p>

                <Button
                    className="bg-green-600 hover:bg-green-700 text-white h-14 text-lg flex gap-2 justify-center items-center"
                    onClick={handleAddProductCart}
                >
                    <ShoppingCart /> Adicionar ao Carrinho
                </Button>
            </div>
        </div>
    );
}
