// api/products/index.ts
const BASE_URL: string = process.env.EXPO_BASE_URL || "https://dummyjson.com"; // fallback if not read from .env (in production env will not expose it just for explain)

export const productsApi = {
  getProducts: async (search?: string) => {
    const res = await fetch(
      `${BASE_URL}/products${search && `/search?q=${search}`}`
    ).then((res) => res.json());
    return res;
  },

  getProductById: (id: string) =>
    fetch(`${BASE_URL}/products/${id}`).then((res) => res.json()),

  getProductsByCategory: async (category: string) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`).then(
      (res) => res.json()
    );
    return res;
  },
};
