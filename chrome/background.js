/*global chrome*/
(function () {
    "use strict";

    var url = "https://cdn.rawgit.com/okuryu/ghe-features/master/ghe-features.json";
    var data;
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.onload = function () {
        data = xhr.response;
    };
    xhr.open("GET", url, true);
    xhr.send();

    chrome.runtime.onMessage.addListener(function (message, sender, sendMessage) {
        sendMessage(data);
    });

}());
