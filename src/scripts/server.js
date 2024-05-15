import { API_URL } from "./const";

export const fetchProductByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/api/products/category/${category}`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Ошибка запроса товаров. Статус ошибка ${error}`);
  }
};
