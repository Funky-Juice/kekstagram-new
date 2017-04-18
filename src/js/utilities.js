'use strict';

module.exports = {
  // Создаем скрипт для загрузки данных
  loadData: function loadData(url, callback) {
    var callbackName  = 'cb' + String(Math.random()).slice(-6);

    window[callbackName] = function(data) {
      callback(data);
    }

    var script = document.createElement('script');
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  },

  // Расчитываем срок хранения куки(количество дней с последнего дня рождения Грейс Хоппер)
  cookieExpire: function cookieExpire() {
    var dateNow = new Date();
    var thisYear = dateNow.getFullYear();
    var GraceHopperBirthday = new Date(thisYear, 11, 9);

    var cookieExpire;
    var msInOneDay = 24 * 60 * 60 * 1000;

    if(dateNow - GraceHopperBirthday > 0) {
      cookieExpire = Math.floor((dateNow - GraceHopperBirthday) / msInOneDay);
    } else {
      GraceHopperBirthday = new Date(thisYear - 1, 11, 9);
      cookieExpire = Math.floor((dateNow - GraceHopperBirthday) / msInOneDay);
    }

    return cookieExpire;
  }
};
