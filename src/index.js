const btns = document.querySelectorAll(".store__category-btn");

const changeActiveBtn = (event) => {
  const target = event.target;

  btns.forEach((btn) => btn.classList.remove("store__category-btn_active"));

  target.classList.add("store__category-btn_active");
};

btns.forEach((btn) => btn.addEventListener("click", changeActiveBtn));
