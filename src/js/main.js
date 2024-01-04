"use strict";
// swiperJS

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
    spaceBetween: 20,
    centeredSliders: true,
  });
}

const reviewSlider = createSlider(
  ".review-slider",
  ".review-slider__dots",
  ".review-slider__btn--next",
  ".review-slider__btn--prev"
);

const productSlider = createSlider(
  ".product-slider",
  ".product-slider__dots",
  ".product-slider__btn--next",
  ".product-slider__btn--prev"
);

const productCatalogSlider = createSlider(
  ".product-catalog-slider",
  ".review-slider__dots",
  ".review-slider__btn--next",
  ".review-slider__btn--prev"
);

if (window.innerWidth <= 768) {
const promoSlider = createSlider(
  ".promo-slider",
  ".promo-slider__dots",
  ".promo-slider__btn--next",
  ".promo-slider__btn--prev"
);
}

if (window.innerWidth <= 768) {
  const restaurantSlider = createSlider(
    ".restaurant-slider",
    ".restaurant-slider__dots",
    ".restaurant-slider__btn--next",
    ".restaurant-slider__btn--prev"
  );
}

// main mobile menu

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu__nav");
  const bodyLock = document.querySelector("body");
  const closeBtn = document.querySelector(".burger__close");

  burger.addEventListener("click", () => {
    burger.classList.add("burger--active");
    mobileMenu.classList.add("mobile-menu__nav--active");
    bodyLock.classList.add("lock");
  });

  closeBtn.addEventListener("click", () => {
    burger.classList.remove("burger--active");
    mobileMenu.classList.remove("mobile-menu__nav--active");
    bodyLock.classList.remove("lock");
  });

  // Клик вне таргета
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".burger") &&
      !e.target.closest(".mobile-menu__nav")
    ) {
      burger.classList.remove("burger--active");
      mobileMenu.classList.remove("mobile-menu__nav--active");
      bodyLock.classList.remove("lock");
    }
  });
});

// filter mobile menu

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".catalog__filter-btn");
  const mobileMenu = document.querySelector(".filter-menu__nav");
  const bodyLock = document.querySelector("body");
  const closeBtn = document.querySelector(".filter-menu__close");

  burger.addEventListener("click", () => {
    burger.classList.add("catalog__filter-btn--active");
    mobileMenu.classList.add("filter-menu__nav--active");
    bodyLock.classList.add("lock");
  });

  closeBtn.addEventListener("click", () => {
    burger.classList.remove("catalog__filter-btn--active");
    mobileMenu.classList.remove("filter-menu__nav--active");
    bodyLock.classList.remove("lock");
  });

  // Клик вне таргета
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".catalog__filter-btn") &&
      !e.target.closest(".filter-menu__nav")
    ) {
      burger.classList.remove("catalog__filter-btn--active");
      mobileMenu.classList.remove("filter-menu__nav--active");
      bodyLock.classList.remove("lock");
    }
  });
});


// filter-card

const filterButtons = document.querySelectorAll(".categories__btn");
const workItems = document.querySelectorAll(".product-list__item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelector(".categories__btn--active")
      .classList.remove("categories__btn--active");
    button.classList.add("categories__btn--active");

    const filter =
      button.getAttribute("data-name") || button.getAttribute("data-filter");

    workItems.forEach((item) => {
      const itemName =
        item.getAttribute("data-name") || item.getAttribute("data-category");

      item.style.display =
        itemName === filter || filter === "filter--all" ? "block" : "none";
    });
  });
});

// header fixed

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const wrapper = document.querySelector(".wrapper");
  const menuLinks = document.querySelectorAll(".menu__link");
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= 90) {
      header.classList.add("fixed");
      wrapper.classList.add("wrapper--height");
    } else {
      header.classList.remove("fixed");
      wrapper.classList.remove("wrapper--height");
    }
  });
});

// no ui slider

document.addEventListener("DOMContentLoaded", function () {
  let priceSliders = document.querySelectorAll(".price-slider");
  let minPriceInput = document.getElementById("minPrice");
  let maxPriceInput = document.getElementById("maxPrice");

  priceSliders.forEach(function (slider) {
    noUiSlider.create(slider, {
      start: [250, 1100],
      connect: true,
      range: {
        min: 1,
        max: 1500,
      },
      step: 1,
      format: {
        to: function (value) {
          return Math.round(value);
        },
        from: function (value) {
          return value;
        },
      },
    });

    slider.noUiSlider.on("update", function (values, handle) {
      minPriceInput.value = values[0];
      maxPriceInput.value = values[1];
    });

    minPriceInput.addEventListener("change", function () {
      slider.noUiSlider.set([this.value, null]);
    });

    maxPriceInput.addEventListener("change", function () {
      slider.noUiSlider.set([null, this.value]);
    });
  });
});
