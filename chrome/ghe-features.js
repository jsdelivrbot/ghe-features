/**
 * Copyright (c) 2015, Ryuichi Okumura. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/okuryu/ghe-features/blob/master/LICENSE
 */
/*global chrome*/
(function () {
  "use strict";

  function inject(meta, data) {
    if (meta.length !== data.length) {
      return false;
    }

    var baseUrl = "https://enterprise.github.com/releases";
    var preMessage = "<li class=\"meta-item\"><span class=\"octicon octicon-mark-github\"></span>";
    var postMessage = "</li>";
    var message;

    for (var i = 0, l = meta.length; i < l; i++) {
      if (data[i] < 0) {
        message = `<a href="${baseUrl}">Not available on GitHub Enterprise</a>`;
      } else if (data[i]) {
        message = `<a href="${baseUrl}/${data[i]}/notes">GitHub Enterprise v${data[i]}</a>`;
      } else {
        continue;
      }
      meta[i].innerHTML += `${preMessage} ${message}${postMessage}`;
    }
  }

  function make(data) {
    if (!data) {
      return false;
    }

    var extracted = [];
    var meta = document.querySelectorAll(".blog-post-meta");
    meta = Array.prototype.slice.call(meta);

    switch (meta.length) {
    case 0:
      return false;
    case 1:
      if (typeof data[location.href] === "undefined") {
        return false;
      }
      extracted.push(data[location.href]);
      break;
    default:
      meta.forEach(function (m) {
        var a = m.parentNode.querySelector(".blog-post-title a");
        if (a && a.href) {
          extracted.push(data[a.href]);
        }
      });
      break;
    }

    inject(meta, extracted);
  }

  chrome.runtime.sendMessage("data", function (data) {
    make(data);
  });

}());
