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

const restaurantSlider = createSlider(
  ".restaurant-slider",
  ".restaurant-slider__dots",
  ".restaurant-slider__btn--next",
  ".restaurant-slider__btn--prev"
);


//burger menu

document.addEventListener('DOMContentLoaded', () => {
	//DOMContentLoaded означает, когда наш документ будет готов к работе, тогда начнут работать наши скрипты
  
	//Mobile Menu
  const burger = document.querySelector('.burger'); //находим наш бургер по селектору класса
  
  burger.addEventListener('click', () => {
	//Добавляем событие "клик" на бургер

  burger.classList.toggle('burger--active'); //при клике на бургер у нас будет либо добавлятся класс, либо удаляется.
		//ВАЖНО! Мы уже работаем с данным классом, поэтому тут "." не ставим, иначе в атрибут class значение добавится с "." и работать не будет.
  });
});

document.addEventListener('DOMContentLoaded', () => {

  //Mobile Menu
  const burger = document.querySelector('.burger'); //наша кнопка
  const mobileMenu = document.querySelector('.burger__nav'); //мобильное меню
  const bodyLock = document.querySelector('body'); //ищем как селектор ТЕГА

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('burger__nav--active'); //когда меню открыто
    if (mobileMenu.classList.contains('burger__nav--active'))  { //Проверяем, есть ли у меню активный класс
      burger.classList.add('burger--active'); //Когда открыто, иконка становится крестиком
      bodyLock.classList.add('lock'); //Блокируем скролл при открытом меню
    }
    else { //Когда нету активного класса у меню
      burger.classList.remove('burger--active'); //Возвращает в исходное состояние
      bodyLock.classList.remove('lock'); //Разрешаем скроллить
    }
  });
});

//Клик вне таргета
document.addEventListener('click', function (e) {
  if (e.target !== burger && e.target !== mobileMenu) {
    burger.classList.remove('burger--active');
    mobileMenu.classList.remove('burger__nav--active');
    bodyLock.classList.remove('lock');
  }
});