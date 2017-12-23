'use strict';

window.Colorize = (function () {

  var colorizeElement = function (element, colors, func) {
    func(element, colors.choice[(++colors.current) % colors.choice.length]);
  };

  window.colorizeElement = colorizeElement;

})();
