/*global chrome*/
(function () {
    "use strict";

    var url = "https://raw.githubusercontent.com/okuryu/ghe-features/master/ghe-features.json?token=AACHHBTQLrsvBszmotNznIBqtTtjm4RJks5VvcSywA%3D%3D";
    var data;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = function () {
        data = xhr.response;
    };
    xhr.open("GET", url, true);
    xhr.send();

    chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
        sendMessage(data);
    });

}());
