import ApiConfig from "../config";

// api/products/index.ts

export const productsApi = {
  getProducts: async (search?: string) => {
    const res = await fetch(
      `${ApiConfig.BASE_URL}/products${search && `/search?q=${search}`}`
    ).then((res) => res.json());
    return res;
  },

  getProductById: (id: string) =>
    fetch(`${ApiConfig.BASE_URL}/products/${id}`).then((res) => res.json()),

  getProductsByCategory: async (category: string) => {
    const res = await fetch(
      `${ApiConfig.BASE_URL}/products/category/${category}`
    ).then((res) => res.json());
    return res;
  },
  deleteProductById: async (productId: number) => {
    try {
      const res = await fetch(`${ApiConfig.BASE_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data)
      return data;
    } catch (err) {
      throw new Error("Error deleting product.");
    }
  },
};
