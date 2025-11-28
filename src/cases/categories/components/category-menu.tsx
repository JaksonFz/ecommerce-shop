import { Button } from "@/components/ui/button"
import { useCategories, useCategory } from "../hooks/use-category"
import { useEffect, useState } from "react"
import type { CategoryDTO } from "../dtos/category.dto"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useSearchParams, useNavigate } from "react-router-dom"

export function CategoryMenu() {
    const { data: categories } = useCategories()
    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([])
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([])
    const [searchParams] = useSearchParams()

    const categoryId = searchParams.get("categoryId") ?? undefined
    const { data: activeCategory } = useCategory(categoryId!)
    const navigate = useNavigate()

    useEffect(() => {
        if (categories) {
            setVisibleItems(categories.slice(0, 5))
            setHiddenItems(categories.slice(5))
        }
    }, [categories])

    function handleSelect(id?: string) {
        const params = new URLSearchParams()

        if (id) params.set("categoryId", id)

        navigate(`/?${params.toString()}`)
    }

    return (
        <aside className="w-[240px] min-h-screen border-r p-4 flex flex-col bg-white">
            <h5 className="font-medium text-xl text-gray-900 mb-1">
                Nossos Produtos
            </h5>
            <p className="text-sm text-gray-500 mb-4">
                Novos produtos todos os dias
            </p>

            <div className="flex flex-col gap-2">
                <Button
                    variant={categoryId ? "outline" : "default"}
                    className="w-full justify-start"
                    onClick={() => handleSelect(undefined)}
                >
                    Todos
                </Button>

                {visibleItems.map((category) => (
                    <Button
                        key={category.id}
                        variant={categoryId === category.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleSelect(category.id)}
                    >
                        {category.name}
                    </Button>
                ))}

                {hiddenItems.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                                Mais
                                <ChevronDown className="ml-1" size={16} />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            {hiddenItems.map((category) => (
                                <DropdownMenuItem
                                    key={category.id}
                                    onClick={() => handleSelect(category.id)}
                                >
                                    {category.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </aside>
    )
}
