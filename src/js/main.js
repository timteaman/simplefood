'use strict';

// swiperJS

function createSlider(selector, options = {}) {
  const defaultOptions = {
    direction: 'horizontal',
    loop: true,
    lazyLoading: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.slider-actions__dots',
      bulletClass: 'slider-actions__dot',
      bulletActiveClass: 'slider-actions__dot--active',
      clickable: true,
    },
    navigation: {
      nextEl: '.slider-btn--next',
      prevEl: '.slider-btn--prev',
    },
    spaceBetween: 20,
    centeredSlides: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return new Swiper(selector, mergedOptions);
}

if (window.innerWidth <= 768) {
  const restaurantSlider = createSlider('.restaurant-slider', {
    pagination: {
      el: '.restaurant-slider__dots',
    },
    navigation: {
      nextEl: '.restaurant-slider__btn--next',
      prevEl: '.restaurant-slider__btn--prev',
    },
    loop: false,
    lazyLoading: false,
  });
}

const reviewSlider = createSlider('.review-slider', {
  pagination: {
    el: '.review-slider__dots',
  },
  navigation: {
    nextEl: '.review-slider__btn--next',
    prevEl: '.review-slider__btn--prev',
  },
});

const productSlider = createSlider('.product-slider', {
  pagination: {
    el: '.product-slider__dots',
  },
  navigation: {
    nextEl: '.product-slider__btn--next',
    prevEl: '.product-slider__btn--prev',
  },
  slidesPerView: 1,
});

const productCatalogSlider = createSlider('.product-catalog-slider', {
  navigation: {
    nextEl: '.product-catalog__btn--next',
    prevEl: '.product-catalog__btn--prev',
  },
  slidesPerView:
    window.innerWidth >= 992 ? 5 : window.innerWidth >= 768 ? 4 : 3,
});

const slidesPerViewValue =
  window.innerWidth <= 768
    ? 1
    : window.innerWidth <= 992
    ? 2
    : window.innerWidth <= 1200
    ? 3
    : 1;

if (window.innerWidth <= 1200) {
  const promoSlider = createSlider('.promo-slider', {
    pagination: {
      el: '.promo-slider__dots',
    },
    navigation: {
      nextEl: '.promo-slider__btn--next',
      prevEl: '.promo-slider__btn--prev',
    },
    spaceBetween: 20,
    slidesPerView: slidesPerViewValue,
  });
}

// mobile menu

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu__nav');
  const bodyLock = document.querySelector('body');
  const closeBtn = document.querySelector('.burger__close');

  burger.addEventListener('click', () => {
    burger.classList.add('burger--active');
    mobileMenu.classList.add('mobile-menu__nav--active');
    bodyLock.classList.add('lock');
  });

  closeBtn.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    mobileMenu.classList.remove('mobile-menu__nav--active');
    bodyLock.classList.remove('lock');
  });

  // click outside target
  document.addEventListener('click', function (e) {
    if (
      !e.target.closest('.burger') &&
      !e.target.closest('.mobile-menu__nav')
    ) {
      burger.classList.remove('burger--active');
      mobileMenu.classList.remove('mobile-menu__nav--active');
      bodyLock.classList.remove('lock');
    }
  });
});

// filter mobile menu

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.catalog__filter-btn');
  const mobileMenu = document.querySelector('.catalog__sidebar');
  const bodyLock = document.querySelector('body');
  const closeBtn = document.querySelector('.catalog__btn-close');

  burger.addEventListener('click', () => {
    burger.classList.add('catalog__filter-btn--active');
    mobileMenu.classList.add('catalog__sidebar--active');
    bodyLock.classList.add('lock');
  });

  closeBtn.addEventListener('click', () => {
    burger.classList.remove('catalog__filter-btn--active');
    mobileMenu.classList.remove('catalog__sidebar--active');
    bodyLock.classList.remove('lock');
  });

  // click outside target

  document.addEventListener('click', function (e) {
    if (
      !e.target.closest('.catalog__filter-btn') &&
      !e.target.closest('.catalog__sidebar')
    ) {
      burger.classList.remove('catalog__filter-btn--active');
      mobileMenu.classList.remove('catalog__sidebar--active');
      bodyLock.classList.remove('lock');
    }
  });
});

// filter-card

const filterButtons = document.querySelectorAll('.categories__btn');
const workItems = document.querySelectorAll('.product-list__item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document
      .querySelector('.categories__btn--active')
      .classList.remove('categories__btn--active');
    button.classList.add('categories__btn--active');

    const filter =
      button.getAttribute('data-name') || button.getAttribute('data-filter');

    workItems.forEach(item => {
      const itemName =
        item.getAttribute('data-name') || item.getAttribute('data-category');

      item.style.display =
        itemName === filter || filter === 'filter--all' ? 'block' : 'none';
    });
  });
});

// header fixed

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const wrapper = document.querySelector('.wrapper');
  const menuLinks = document.querySelectorAll('.menu__link');
  const headerHeight = header.offsetHeight;

  window.addEventListener('scroll', function () {
    if (window.pageYOffset >= 90) {
      header.classList.add('fixed');
      wrapper.classList.add('wrapper--height');
    } else {
      header.classList.remove('fixed');
      wrapper.classList.remove('wrapper--height');
    }
  });
});

// no ui slider

document.addEventListener('DOMContentLoaded', function () {
  let priceSliders = document.querySelectorAll('.price-slider');
  let minPriceInput = document.getElementById('minPrice');
  let maxPriceInput = document.getElementById('maxPrice');

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

    slider.noUiSlider.on('update', function (values, handle) {
      minPriceInput.value = values[0];
      maxPriceInput.value = values[1];
    });

    minPriceInput.addEventListener('change', function () {
      slider.noUiSlider.set([this.value, null]);
    });

    maxPriceInput.addEventListener('change', function () {
      slider.noUiSlider.set([null, this.value]);
    });
  });
});

// dropdown menu

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.dropdown__select');
  const menu = dropdown.querySelector('.dropdown__menu');
  const options = dropdown.querySelectorAll('.dropdown__item');
  const selected = dropdown.querySelector('.dropdown__selected');

  select.addEventListener('click', () => {
    select.classList.toggle('dropdown__select--clicked');
    menu.classList.toggle('dropdown__menu--open');
  });

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('dropdown__select--clicked');
      menu.classList.remove('dropdown__menu--open');
      options.forEach(option => {
        option.classList.remove('dropdown__item--active');
      });
      option.classList.add('dropdown__item--active');
    });
  });
});

function showContent(btn) {
  var contentId = btn.getAttribute('data-content');

  document
    .querySelectorAll(
      '.product-info__box, .product-info__traits, .product-info__review'
    )
    .forEach(function (content) {
      content.classList.remove('active');
    });

  document.getElementById(contentId).classList.add('active');

  document.querySelectorAll('.product-info__btn').forEach(function (button) {
    button.classList.remove('product-info__btn--active');
  });

  btn.classList.add('product-info__btn--active');
}

// bread crumbs

document.addEventListener('DOMContentLoaded', function () {
  var currentPage = 'third'; // Замените на реальное значение

  document
    .querySelectorAll('.breadcrumbs__link--current')
    .forEach(function (link) {
      link.classList.remove('breadcrumbs__link--current');
    });

  let selector =
    currentPage === 'home'
      ? '.breadcrumbs__link[href="./index.html"]'
      : currentPage === 'catalog'
      ? '.breadcrumbs__link[href="./catalog.html"]'
      : '.breadcrumbs__link:not([href="./index.html"]):not([href="./catalog.html"])';

  let thirdElementLink = document.querySelector(selector);
  if (thirdElementLink) {
    thirdElementLink.classList.add('breadcrumbs__link--current');
  }
});
