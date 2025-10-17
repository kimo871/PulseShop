// api/categories/index.ts
const BASE_URL: string = process.env.EXPO_BASE_URL || "https://dummyjson.com"; // fallback if not read from .env (in production env will not expose it just for explain)

export const categoriesApi = {
  getCategroies: async () => {
    const res = await fetch(
      `${BASE_URL}/products/categories/`
    ).then((res) => res.json());
    return res;
  },

  getCategorisAsList: async() =>{
    const res = await fetch(`${BASE_URL}/products/category-list`).then((res) =>
      res.json()
    )
    return res;
}
};
