import { api } from "../../../lib/axios";
import type { ProductDTO } from "../dtos/product.dto";

const _ENDPOINT = "/products";

export const ProductService = {
    async list(categoryId?: string, search?: string): Promise<ProductDTO[]> {
        const params: any = {};
        if (categoryId) params.categoryId = categoryId;
        if (search !== undefined) params.search = search;

        const result = await api.get(_ENDPOINT, { params });
        return result.data;
    },

    async getById(id: string): Promise<ProductDTO> {
        const result = await api.get(`${_ENDPOINT}/${id}`);
        return result.data;
    },
};
