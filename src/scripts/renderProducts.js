import { API_URL, cardList } from "./const";

const createProductCard = ({ id, name, categories, photoUrl, price }) => {
  const card = document.createElement("li");
  card.classList.add("store__item");

  card.innerHTML = `
    <article class="store__card card">
      <img class="card__img" src="${API_URL}${photoUrl}" alt="${name}" width="388" height="288">
  
      <h3 class="card__title">${name}</h3>
      <p class="card__price">${price}&nbsp;₽</p>

      <button class="card__btn-add-cart btn btn_purple" data-id="${id}">Заказать</button>
    </article>
  `;

  return card;
};

export const renderProducts = (products) => {
  cardList.textContent = "";
  products.forEach((product) => {
    const productCard = createProductCard(product);
    cardList.append(productCard);
  });
};
