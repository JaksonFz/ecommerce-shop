import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
    description: string;
    price: number | bigint;
    brand: BrandDTO;
    category: CategoryDTO;
    active: boolean;
    id?: string;
    name: string;
}

export interface BrandDTO {
    id?: string;
    name: string;
}
