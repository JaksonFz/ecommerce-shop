import type { CategoryDTO } from "@/cases/categories/dtos/category.dto";

export interface ProductDTO {
    description: string;
    price: number;
    brand: BrandDTO;
    category: CategoryDTO;
    photos?: ProductPhotoDTO[]
    active: boolean;
    id?: string;
    name: string;
}

export interface ProductPhotoDTO {
    id: string;
    path: string;
}

export interface BrandDTO {
    id?: string;
    name: string;
}
