import { btns } from "./const";
import { renderProducts } from "./renderProducts";
import { fetchProductByCategory } from "./server";

const changeCategory = async ({ target }) => {
  btns.forEach((btn) => btn.classList.remove("store__category-btn_active"));

  target.classList.add("store__category-btn_active");

  renderProducts(await fetchProductByCategory(target.textContent));
};

export const changeCategoryProducts = () => {
  btns.forEach(async (btn) => {
    btn.addEventListener("click", changeCategory);
    if (btn.classList.contains("store__category-btn_active")) {
      renderProducts(await fetchProductByCategory(btn.textContent));
    }
  });
};
