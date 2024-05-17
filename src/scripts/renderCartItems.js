import { API_URL, modalCartList, modalCartPrice } from "./const";

const calculateTotalPrice = (cartItems, products) => {
  return cartItems.reduce((acc, cartItem) => {
    const product = products.find((prod) => prod.id === cartItem.id);

    return acc + product.price * cartItem.count;
  }, 0);
};

export const renderCartItems = async () => {
  modalCartList.textContent = "";
  const cartItems = JSON.parse(localStorage.getItem("cart-petplanet") || "[]");
  const products = JSON.parse(
    localStorage.getItem("cartProductDetails") || "[]"
  );

  products.forEach(({ id, name, price, photoUrl }) => {
    const cartItem = cartItems.find((item) => item.id === id);

    if (!cartItem) return;

    const li = document.createElement("li");
    li.classList.add("modal__cart-item");
    li.innerHTML = `
        <img class="modal__cart-img" src="${API_URL}${photoUrl}" alt="${name}">
          <h3 class="modal__cart-title">${name}</h3>
          <div class="modal__cart-count-wrapper">
            <button class="modal__cart-btn modal__cart-btn_minus" type="button" data-id="${id}">-</button>
            <span class="modal__cart-count">${cartItem.count}</span>
            <button class="modal__cart-btn modal__cart-btn_plus" type="button" data-id="${id}">+</button>
            </div>
          <p class="modal__cart-price">${price * cartItem.count}&nbsp;₽</p>

    `;

    modalCartList.append(li);
  });

  const totalPrice = calculateTotalPrice(cartItems, products);
  modalCartPrice.innerHTML = `${totalPrice}&nbsp;₽`;
};
