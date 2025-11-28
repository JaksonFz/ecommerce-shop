import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { Link, useSearchParams } from "react-router-dom";

export function ProductListPage() {

    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("categoryId") || undefined;

    const { data: products } = useProducts(categoryId);

    return (
        <section className="flex flex-col w-full">
            <div
                className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                xl:grid-cols-4 
                gap-8
            "
            >
                {products &&
                    products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                        >
                            <ProductCard product={product} />
                        </Link>
                    ))}
            </div>
        </section>
    );
}
