'use strict';

var createPictureElement = require('./createPictureElem');
var utilities = require('./utilities');

var DATA_URL = 'http://localhost:1507/api/pictures';
var pictures = 0;
var picturesContainer = document.querySelector('.pictures');


document.querySelector('.filters').classList.add('hidden');

// Выводим список фотографий в блок на основе переданных данных
var renderPictures = function(pictures) {
  pictures.forEach(function(item) {
    picturesContainer.appendChild(createPictureElement(item));
  });
}

// Загружаем данные
utilities.loadData(DATA_URL, renderPictures);

document.querySelector('.filters').classList.remove('hidden');

module.exports = renderPictures;
