function createSlider(selector, paginationEl, nextBtn, prevBtn) {
  return new Swiper(selector, {
    direction: "horizontal",
    loop: true,
    lazyLoading: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: paginationEl,
      bulletClass: "slider-actions__dot",
      bulletActiveClass: "slider-actions__dot--active",
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });
}

const reviewSlider = createSlider(
  ".review-slider",
  ".review-slider__dots",
  ".review-slider__btn--next",
  ".review-slider__btn--prev"
);

if (window.innerWidth <= 576) {
  const restaurantSlider = createSlider(
    ".restaurant-slider",
    ".restaurant-slider__dots",
    ".restaurant-slider__btn--next",
    ".restaurant-slider__btn--prev"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  //Mobile Menu
  const burger = document.querySelector(".burger"); //наша кнопка
  const mobileMenu = document.querySelector(".burger__nav"); //мобильное меню
  const bodyLock = document.querySelector("body"); //ищем как селектор ТЕГА
  const closeBtn = document.querySelector(".close-btn");

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("burger__nav--active");
    bodyLock.classList.add("lock");
  });

  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("burger__nav--active"); 
    bodyLock.classList.remove("lock"); 
  });
});

//Клик вне таргета
document.addEventListener("click", function (e) {
  if (e.target !== mobileMenu) {
    burger.classList.remove("burger--active");
    mobileMenu.classList.remove("burger__nav--active");
    bodyLock.classList.remove("lock");
  }
});
