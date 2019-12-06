// QTH LOCATOR YANDEX MAP
// By Pavel V. Hladkikh aka EU4DGC                                 
// http://qsy.by                                                  
// https://www.youtube.com/channel/UCJSjwbCZ5R5CGY8qzjd203w    
// Copyright (c) 2019 Pavel V. Hladkikh
// Script can be used in any projects with mention authorship.
// Скрипт можно использовать в любых проектах с указанием авторства. 


ymaps.ready(init); // Инициализация карты
var myMap;

function init () {
    myMap = new ymaps.Map("map", {  // Создаем карту и настраиваем параметры отображения
        center: [53.9757, 27.5492], // Координаты центра карты
        zoom: 7,
        controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl']  
    }, {
        balloonMaxWidth: 300, // 
        searchControlProvider: 'yandex#search'
    });

    // Обработка события, возникающего при щелчке
    // левой кнопкой мыши в любой точке карты.
    // При возникновении такого события откроем балун.
    myMap.events.add('click', function (e) {
    		var coords = e.get('coords');
            var qth =(returnQth(lat = coords[0], lng = coords[1]))
            myMap.balloon.open(e.get('coords'), {
                contentHeader:'Locator: ' + qth,
                contentBody:
                    '<sup>Широта: ' + [
                    coords[0].toPrecision(6)] + ' Долгота: '+ 
                    [coords[1].toPrecision(6)] + '</sup>',
                //contentFooter:'<sup>Щелкните еще раз</sup>'
            });            
            lat = coords[0].toPrecision(6)
            lng = coords[1].toPrecision(6)                         
    });

    
    function chr(x) {return String.fromCharCode(x); }
    function floor(x) {return Math.floor(x); }

    // Функция перевода географических координат в QTH LOCATOR

    function returnQth(lat, lng) {
        var qth = '';
        lat += 90; lng += 180;
        lat = lat / 10 + 0.0000001;
        lng = lng / 20 + 0.0000001;
        qth += chr(65 + lng) + chr(65 + lat);
        lat = 10 * (lat - floor(lat));
        lng = 10 * (lng - floor(lng));
        qth += chr(48 + lng) + chr(48 + lat);
        lat = 24 * (lat - floor(lat));
        lng = 24 * (lng - floor(lng));
        qth += chr(65 + lng) + chr(65 + lat);            
        return qth;
    } // returnQth()
}