import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useEffect, useState } from "react";

type ProductCardProps = { product: ProductDTO };

export function ProductCard({ product }: ProductCardProps) {
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        if (product.photos && product.photos.length > 0) {
            const fullURL = bucketBaseURL + product.photos[0].path;
            setImagePath(fullURL);
        }
    }, [product]);

    return (
        <Card className="w-full max-w-xs rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition cursor-pointer">
            <CardHeader className="p-0 h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src={imagePath} className="w-full h-full object-cover" />
            </CardHeader>

            <CardContent className="p-4 flex flex-col gap-2">

                <h4 className="text-base font-medium text-gray-800 line-clamp-2">
                    {product.name}
                </h4>

                <p className="text-lg font-semibold text-gray-900">
                    <IntlProvider locale="pt-BR">
                        <FormattedNumber value={product.price} style="currency" currency="BRL" />
                    </IntlProvider>
                </p>

            </CardContent>
        </Card>
    );
}
