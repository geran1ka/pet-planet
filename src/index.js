import { cartController } from "./scripts/cartController";
import { changeCategoryProducts } from "./scripts/changeCategoryProducts";
import { cartBtn } from "./scripts/const";
cartBtn.addEventListener;

const init = () => {
  changeCategoryProducts();
  cartController();
};

init();
