import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../hooks/use-cart";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { MapPin, BookOpen } from "lucide-react";
import { QuantityInput } from "@/components/ui/quantity-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export function CartContent() {
    const { cart, removeProductCart, updateQuantity, cartTotal } = useCart();
    const bucketBaseURL = import.meta.env.VITE_BUCKET_URL;

    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
            <Card className="flex-1">
                <CardContent className="p-6">
                    <ItemGroup className="gap-6">
                        {cart.items.map((item) => (
                            <Item key={item.product.id} variant="muted" role="listitem" asChild>
                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 border-b pb-4">
                                    <ItemMedia variant="image" className="flex-shrink-0">
                                        {item.product.photos?.length > 0 ? (
                                            <img
                                                src={`${bucketBaseURL}${item.product.photos[0].path}`}
                                                className="w-20 h-20 object-contain rounded-md"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 flex items-center justify-center text-gray-500 bg-gray-200 rounded-md">
                                                <BookOpen className="w-8 h-8 text-red-600" />
                                            </div>
                                        )}
                                    </ItemMedia>

                                    <ItemContent className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                                        <ItemTitle className="text-lg font-semibold">{item.product.name}</ItemTitle>
                                        <ItemDescription className="text-sm text-gray-500">
                                            {item.product.brand?.name}
                                        </ItemDescription>
                                    </ItemContent>

                                    <ItemContent className="flex flex-col items-center lg:items-end gap-2">
                                        <QuantityInput
                                            initialQuantity={item.quantity}
                                            onChange={(newQuantity) =>
                                                updateQuantity(item.product.id, newQuantity)
                                            }
                                            className="w-24"
                                        />
                                        <p className="font-semibold">
                                            <IntlProvider locale="pt-BR">
                                                <FormattedNumber
                                                    value={item.product.price * item.quantity}
                                                    style="currency"
                                                    currency="BRL"
                                                />
                                            </IntlProvider>
                                        </p>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-600 hover:bg-red-100"
                                                    onClick={() => removeProductCart(item.product.id)}
                                                >
                                                    <BookOpen />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Remover do carrinho</TooltipContent>
                                        </Tooltip>
                                    </ItemContent>
                                </div>
                            </Item>
                        ))}
                    </ItemGroup>
                </CardContent>
            </Card>

            <div className="w-full max-w-sm flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Frete para CEP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InputGroup>
                            <InputGroupInput placeholder="CEP" className="rounded-l-md" />
                            <InputGroupAddon>
                                <MapPin className="text-red-600" />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-r-md hover:bg-red-50 hover:text-red-700"
                                >
                                    Calcular
                                </Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </CardContent>
                </Card>

                <Card className="bg-gray-900 text-white">
                    <CardTitle className="text-sm p-4 pb-0">Total do Pedido</CardTitle>
                    <CardContent className="flex flex-col gap-2 p-4">
                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                    <ItemTitle>Frete:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <p className="text-sm font-semibold flex justify-end">
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber value={0} style="currency" currency="BRL" />
                                        </IntlProvider>
                                    </p>
                                </ItemContent>
                            </Item>
                        </ItemGroup>

                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                    <ItemTitle>Produtos:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <p className="text-sm font-semibold flex justify-end">
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber value={cartTotal} style="currency" currency="BRL" />
                                        </IntlProvider>
                                    </p>
                                </ItemContent>
                            </Item>
                        </ItemGroup>

                        <ItemGroup>
                            <Item variant="muted">
                                <ItemContent>
                                    <ItemTitle>Total:</ItemTitle>
                                </ItemContent>
                                <ItemContent>
                                    <p className="text-sm font-semibold flex justify-end">
                                        <IntlProvider locale="pt-BR">
                                            <FormattedNumber value={cartTotal} style="currency" currency="BRL" />
                                        </IntlProvider>
                                    </p>
                                </ItemContent>
                            </Item>
                        </ItemGroup>
                    </CardContent>

                    <CardFooter>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3">
                            Finalizar Pedido
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
