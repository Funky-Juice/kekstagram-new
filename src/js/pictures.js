'use strict';

var createPictureElement = require('./createPictureElem');
var utilities = require('./utilities');
var Gallery = require('./gallery');

var DATA_URL = 'http://localhost:1507/api/pictures';
var picturesContainer = document.querySelector('.pictures');


document.querySelector('.filters').classList.add('hidden');

// Выводим список фотографий в блок на основе переданных данных
var renderPictures = function(pictures) {
  Gallery.setPictures(pictures);

  pictures.forEach(function(item, i) {
    picturesContainer.appendChild(createPictureElement(item, i));
  });
}

// Загружаем данные
utilities.loadData(DATA_URL, renderPictures);

document.querySelector('.filters').classList.remove('hidden');

module.exports = renderPictures;
