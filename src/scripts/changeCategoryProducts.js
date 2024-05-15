import { btns } from "./const";
import { renderProducts } from "./renderProducts";
import { fetchProductByCategory } from "./server";

const changeActiveBtn = async (event) => {
  const target = event.target;

  btns.forEach((btn) => btn.classList.remove("store__category-btn_active"));

  target.classList.add("store__category-btn_active");

  renderProducts(await fetchProductByCategory(target.textContent));
};

export const changeCategoryProducts = () => {
  btns.forEach((btn) => btn.addEventListener("click", changeActiveBtn));
};
