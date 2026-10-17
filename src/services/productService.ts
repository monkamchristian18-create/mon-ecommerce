import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId: number;
  active: boolean;
}

export type CreateProductData = Omit<Product, "id">;

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  async create(data: CreateProductData): Promise<Product> {
    const response = await api.post<Product>("/products", data);
    return response.data;
  },

  async update(
    id: number,
    data: Partial<CreateProductData>,
  ): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default productService;