import type { ProductDTO } from "../dtos/product.dto"

type ProductDetailProps = {
    product: ProductDTO;
}

export function ProductDetail({ product }: ProductDetailProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex">

            </div>
        </div>
    )
}