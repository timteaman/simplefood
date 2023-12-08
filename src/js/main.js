const swiper = new Swiper(".review-slider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  lazyLoading: true,
  autoplay: {
    delay: 3500,
    disableOnIteraction: false
  },

  pagination: {
    el: ".review-slider__dots",
    bulletClass: 'slider-actions__dot',
    bulletActiveClass: 'slider-actions__dot--active',
    clickable: true,
  },
  navigation: {
    nextEl: ".review-slider__btn--next",
    prevEl: ".review-slider__btn--prev",
  },
});