'use strict';

var Gallery = function() {
  // Массив объектов для отображения
  this.pictures = [];

  // Номер текущей фотографии в галерее
  this.activePicture = 0;

  // Ссылки на DOM элементы
  this.galleryContainer = document.querySelector('.gallery-overlay');
  this.galleryClose = this.galleryContainer.querySelector('.gallery-overlay-close');
  this.galleryImage = this.galleryContainer.querySelector('.gallery-overlay-image');
  this.galleryLikes = this.galleryContainer.querySelector('.likes-count');
  this.galleryComments = this.galleryContainer.querySelector('.comments-count');
}

Gallery.prototype = {
  setPictures: function(pictures) {
    this.pictures = pictures;
    // console.log(this.pictures.length - 1);
  },

  show: function(pictureNum) {
    var self = this;

    this.galleryClose.onclick = function () {
      self.hide();
    };

    // Обработчик нажатия esc/enter
    this.onCloseKeydownHandler = function(evt) {
      if (evt.keyCode === 27 || evt.keyCode === 13) {
        evt.preventDefault();
        self.hide();
      }
    };

    window.addEventListener('keydown', this.onCloseKeydownHandler);

    // Обработчик нажатия space
    this.onNextKeydownHandler = function(evt) {
      if (evt.keyCode === 32) {
        evt.preventDefault();

        if (pictureNum == self.pictures.length - 1) {
          pictureNum = 0;
        }
        pictureNum++;
        self.setActivePicture(pictureNum);
      }
    };

    window.addEventListener('keydown', this.onNextKeydownHandler);

    this.galleryImage.onclick = function () {
      if (pictureNum == self.pictures.length - 1) {
        pictureNum = 0;
      }
      pictureNum++;
      self.setActivePicture(pictureNum);
    }

    this.galleryContainer.classList.remove('invisible');

    this.setActivePicture(pictureNum);
  },

  hide: function() {
    this.galleryContainer.classList.add('invisible');

    this.galleryClose.onclick = null;
    this.galleryImage.onclick = null;

    window.removeEventListener('keydown', this.onCloseKeydownHandler);
    window.removeEventListener('keydown', this.onNextKeydownHandler);
  },

  setActivePicture: function(pictureNum) {
    this.activePicture = pictureNum;
    this.galleryImage.src = this.pictures[pictureNum].url;
    this.galleryLikes.innerText = this.pictures[pictureNum].likes;
    this.galleryComments.innerText = this.pictures[pictureNum].comments;
  }
}

module.exports = new Gallery();
