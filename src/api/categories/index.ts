// api/categories/index.ts

import ApiConfig from "../config";

export const categoriesApi = {
  getCategroies: async () => {
    const res = await fetch(
      `${ApiConfig.BASE_URL}/products/categories/`
    ).then((res) => res.json());
    return res;
  },

  getCategorisAsList: async() =>{
    const res = await fetch(`${ApiConfig.BASE_URL}/products/category-list`).then((res) =>
      res.json()
    )
    return res;
}
};
