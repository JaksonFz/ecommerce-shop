import { Button } from "@/components/ui/button"
import type { ProductDTO } from "../dtos/product.dto"
import { cn } from "@/lib/utils"
import { FormattedNumber, IntlProvider } from "react-intl"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { useCart } from "../../cart/hooks/use-cart"
import { QuantityInput } from "../../../components/ui/quantity-input"

type ProductDetailProps = {
    product: ProductDTO
}

export function ProductDetail({ product }: ProductDetailProps) {
    const { addProduct } = useCart()
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL
    const [selectedPhoto, setSelectedPhoto] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [message, setMessage] = useState("")

    const photos = product.photos || []
    const mainPhoto = photos[selectedPhoto]
    const mainImagePhoto = mainPhoto
        ? `${bucketBaseURL}${mainPhoto.path}`
        : `https://placehold.co/500x500?text=Sem+Imagem`

    function handleAddProductCart() {
        addProduct(product, quantity)
        setMessage("Pedido adicionado ao carrinho!")
        setTimeout(() => setMessage(""), 3000)
    }

    return (
        <div className="w-full flex flex-col mt-10">

            <div className="w-full bg-black rounded-xl p-6 flex flex-col lg:flex-row lg:items-center lg:gap-10">

                <div className="flex flex-col w-full max-w-2xl items-center">
                    <h1 className="text-3xl font-semibold text-white mb-4 text-center">
                        {product.name}
                    </h1>

                    <div className="w-full h-[480px] bg-zinc-900 rounded-xl shadow flex items-center justify-center overflow-hidden">
                        <img src={mainImagePhoto} className="w-full h-full object-contain" />
                    </div>

                    {photos.length > 1 && (
                        <ul className="flex gap-3 mt-4 overflow-x-auto pb-2 justify-center">
                            {photos.map((photo, index) => (
                                <li key={photo.id}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-20 h-20 rounded-md border p-0",
                                            index === selectedPhoto
                                                ? "border-red-600"
                                                : "border-gray-500"
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

                    <p className="text-gray-200 leading-relaxed mt-6 text-center">
                        {product.description}
                    </p>
                </div>

                <div className="w-full max-w-sm bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6 mt-8 lg:mt-0 items-center">

                    <p className="text-3xl font-bold text-red-600 text-center">
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber
                                value={product.price}
                                style="currency"
                                currency="BRL"
                            />
                        </IntlProvider>
                    </p>

                    <div className="bg-white rounded-lg p-3 flex justify-center">
                        <QuantityInput
                            initialQuantity={1}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>

                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white h-14 text-lg flex gap-2 justify-center items-center"
                        onClick={handleAddProductCart}
                    >
                        <ShoppingCart /> Adicionar ao Carrinho
                    </Button>

                    {message && (
                        <p className="text-green-500 text-sm text-center mt-2">
                            {message}
                        </p>
                    )}

                    <p className="text-gray-300 text-sm text-center">
                        Entrega rápida ou retirada na loja.
                    </p>
                </div>

            </div>
        </div>
    )
}
