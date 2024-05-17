export const API_URL = "http://localhost:3000";

export const cardList = document.querySelector(".store__list");

export const btns = document.querySelectorAll(".store__category-btn");

export const cartBtn = document.querySelector(".store__cart-btn");
export const cartCount = cartBtn.querySelector(".store__cart-count");

export const overlay = document.querySelector(".overlay");
export const modalCartList = document.querySelector(".modal__cart-list");
export const modalCloseBtn = overlay.querySelector(".overlay__close-btn");
export const cartForm = document.querySelector(".modal__cart-form");
export const modalCartPrice = cartForm.querySelector(".modal__cart-price");
export const modalCartSubmit = cartForm.querySelector(".modal__cart-submit");

export const orderMessageElement = document.createElement("div");
orderMessageElement.classList.add("order-message");

export const orderMessageText = document.createElement("div");
orderMessageText.classList.add("order-message__text");

export const orderMessageCloseBtn = document.createElement("div");
orderMessageCloseBtn.classList.add(
  "order-message__close-btn",
  "btn",
  "btn_carrot"
);
// orderMessageCloseBtn.classList.add("order-message__close-btn, btn, btn_carrot");
// orderMessageCloseBtn.classList.add("order-message__close-btn, btn, btn_carrot");

orderMessageCloseBtn.textContent = "Закрыть";

orderMessageElement.append(orderMessageText, orderMessageCloseBtn);

orderMessageCloseBtn.addEventListener("click", () => {
  orderMessageElement.remove();
});
