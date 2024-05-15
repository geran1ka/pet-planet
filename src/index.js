import { changeCategoryProducts } from "./scripts/changeCategoryProducts";
import { renderProducts } from "./scripts/renderProducts";
import { fetchProductByCategory } from "./scripts/server";

const init = async () => {
  changeCategoryProducts();
  renderProducts(await fetchProductByCategory("Домики"));
};

init();
