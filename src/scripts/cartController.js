import {
  API_URL,
  cartBtn,
  cartCount,
  cartForm,
  modalCartList,
  modalCartSubmit,
  orderMessageElement,
  orderMessageText,
  overlay,
} from "./const";
import { renderCartItems } from "./renderCartItems";
import { fetchProductById } from "./server";

export const updateCartCount = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart-petplanet") || "[]");
  cartCount.textContent = cartItems.length;
};

export const updateCartItem = (id, change) => {
  const cartItems = JSON.parse(localStorage.getItem("cart-petplanet") || "[]");
  const itemIndex = cartItems.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    cartItems[itemIndex].count += change;

    if (cartItems[itemIndex].count <= 0) {
      cartItems.splice(itemIndex, 1);
    }

    localStorage.setItem("cart-petplanet", JSON.stringify(cartItems));
    updateCartCount();
    renderCartItems();
  }

  if (!cartItems.length) {
    const listItem = document.createElement("li");
    listItem.textContent = "Корзина пуста";
    modalCartList.append(listItem);
    modalCartSubmit.setAttribute("disabled", true);
  }
};

export const addToCart = (id) => {
  const cartItems = JSON.parse(localStorage.getItem("cart-petplanet") || "[]");

  const existingItem = cartItems.find((item) => item.id === id);

  if (existingItem) {
    existingItem.count += 1;
  } else {
    cartItems.push({ id, count: 1 });
  }

  localStorage.setItem("cart-petplanet", JSON.stringify(cartItems));

  updateCartCount();
};

const submitOrder = async (e) => {
  e.preventDefault();

  const storeId = cartForm.store.value;
  const cartItems = JSON.parse(localStorage.getItem("cart-petplanet") || "[]");

  const products = cartItems.map(({ id, count }) => ({
    id,
    quantity: count,
  }));

  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storeId, products }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const { orderId } = await response.json();

    localStorage.removeItem("cart-petplanet");
    localStorage.removeItem("cartProductDetails");

    orderMessageText.textContent = `Ваш заказ оформлен, номер ${orderId}. Вы можете забрать его завтра после 12:00`;
    document.body.append(orderMessageElement);
    updateCartCount();
    overlay.style.display = "none";
  } catch (error) {
    console.error(`Ошибка оформления заказа. Статус ошибки ${error}`);
  }
};

export const cartController = () => {
  updateCartCount();

  cartBtn.addEventListener("click", async () => {
    overlay.style.display = "flex";
    const cartItems = JSON.parse(
      localStorage.getItem("cart-petplanet") || "[]"
    );
    const ids = cartItems.map((item) => item.id);

    if (!ids.length) {
      modalCartList.textContent = "";

      const listItem = document.createElement("li");
      listItem.textContent = "Корзина пуста";
      modalCartList.append(listItem);
      modalCartSubmit.setAttribute("disabled", true);

      return;
    }
    modalCartSubmit.removeAttribute("disabled");

    const products = await fetchProductById(ids);
    localStorage.setItem("cartProductDetails", JSON.stringify(products));
    renderCartItems();
  });

  overlay.addEventListener("click", ({ target }) => {
    if (target === overlay || target.closest(".overlay__close-btn")) {
      overlay.style.display = "none";
    }
  });

  modalCartList.addEventListener("click", ({ target }) => {
    if (target.classList.contains("modal__cart-btn_plus")) {
      const id = target.dataset.id;
      updateCartItem(id, 1);
    }

    if (target.classList.contains("modal__cart-btn_minus")) {
      const id = target.dataset.id;
      updateCartItem(id, -1);
    }
  });

  cartForm.addEventListener("submit", submitOrder);
};
