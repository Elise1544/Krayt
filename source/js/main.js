'use strict';

(function () {

  new window.Swiper('.slider-introduction__container', {
    pagination: {
      el: '.slider-introduction__pagination',
      clickable: true,
    }

  });

  new window.Swiper('.slider-spaces__container', {
    navigation: {
      nextEl: '.slider-spaces__button--next',
      prevEl: '.slider-spaces__button--prev'
    },
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    pagination: {
      el: '.slider-spaces__pagination',
      type: 'fraction',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  });

  new window.Swiper('.slider-gallery__container', {
    navigation: {
      nextEl: '.slider-gallery__button--next',
      prevEl: '.slider-gallery__button--prev'
    },
    slidesPerView: 3,
    spaceBetween: 20,
    initialSlide: 1,
    slidesOffsetAfter: 280,
    slidesOffsetBefore: 280,
  });

  new window.Swiper('.slider-review__container', {
    navigation: {
      nextEl: '.slider-review__button--next',
      prevEl: '.slider-review__button--prev'
    },
    slidesPerView: 2.77,
    spaceBetween: 28,
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true
    }
  });

  const scopeItems = document.querySelectorAll('.scope__item');
  const comfortItems = document.querySelectorAll('.comfort__item');

  for (let i = 0; i < scopeItems.length; i++) {
    scopeItems[i].addEventListener('click', function() {
      scopeItems.forEach(function (item) {
        item.classList.remove('scope__item--active');
      });
      scopeItems[i].classList.add('scope__item--active');
      comfortItems.forEach(function (item) {
        item.classList.remove('comfort__item--active')
      });
      comfortItems[i].classList.add('comfort__item--active');
    })
  }


})();
