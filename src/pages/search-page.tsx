import { useSearchParams, Link } from "react-router-dom";
import { useProducts } from "@/cases/products/hooks/use-product";

export function SearchPage() {
    const [params] = useSearchParams();
    const q = params.get("q") ?? "";

    const { data, isLoading } = useProducts(undefined, q);

    if (isLoading) return <p>Carregando...</p>;

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
                Resultados para: "{q}"
            </h2>

            {data && data.length > 0 ? (
                <div className="grid grid-cols-3 gap-6">
                    {data.map((p) => (
                        <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            className="border rounded p-4 hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-bold">{p.name}</h3>
                            <p className="text-sm">{p.description}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Nenhum produto encontrado.</p>
            )}
        </div>
    );
}
