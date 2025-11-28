import { useCart } from "../cases/cart/hooks/use-cart";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CartEmpty } from "@/cases/cart/components/cart-empty";
import { CartContent } from "@/cases/cart/components/cart-content";

export function CartPage() {
    const { cart } = useCart();

    return (
        <div className="p-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            Carrinho de Compras
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="py-8">
                {cart.items.length > 0 ? (
                    <CartContent />
                ) : (
                    <CartEmpty />
                )}
            </div>
        </div>
    );
}
