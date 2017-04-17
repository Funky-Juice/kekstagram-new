'use strict';

var IMG_LOAD_TIMEOUT = 2000;

var template = document.getElementById('picture-template');
var templateContent = 'content' in template ? template.content : template;


// Создаём блок фотографии на основе шаблона
function createPictureElement(item) {
  var templateElement =  templateContent.querySelector('.picture').cloneNode(true);

  var contentImg = new Image();

  contentImg.onload = function(evt) {
    clearTimeout(timerID);
    templateElement.getElementsByTagName('img')[0].src = evt.target.src;
  }
  contentImg.onError = function() {
    templateElement.classList.add('picture-load-failure');
  }

  contentImg.src = item.url;

  var timerID = setTimeout(function() {
    templateElement.classList.add('picture-load-failure');
  }, IMG_LOAD_TIMEOUT);

  templateElement.querySelector('.picture-comments').innerHTML = item.comments;
  templateElement.querySelector('.picture-likes').innerHTML = item.likes;
  return templateElement;
}

module.exports = createPictureElement;
