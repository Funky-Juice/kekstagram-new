'use strict';

var DATA_URL = 'http://localhost:1507/api/pictures';
var IMG_LOAD_TIMEOUT = 2000;
var pictures = 0;
var template = document.getElementById('picture-template');
var templateContent = 'content' in template ? template.content : template;
var picturesContainer = document.querySelector('.pictures');

var loadData = function (url, callback) {
  var callbackName  = 'cb' + String(Math.random()).slice(-6);

  window[callbackName] = function(data) {
    callback(data);
  }

  var script = document.createElement('script');
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
}

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

document.querySelector('.filters').classList.add('hidden');

var renderPictures = function(pictures) {
  pictures.forEach(function(item) {
    picturesContainer.appendChild(createPictureElement(item));
  });
}

loadData(DATA_URL, renderPictures);

document.querySelector('.filters').classList.remove('hidden');
