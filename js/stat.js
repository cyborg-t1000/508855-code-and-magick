// stats.js

'use strict';

window.renderStatistics = function (ctx, names, times) {

  var drawCloud = function (x, y, width, heigth) {
    var offset = 10;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + offset, y + heigth / 2);
    ctx.lineTo(x, y + heigth);
    ctx.lineTo(x + width / 2, y + heigth - offset);
    ctx.lineTo(x + width, y + heigth);
    ctx.lineTo(x + width - offset, y + heigth / 2);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width / 2, y + offset);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloud(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  drawCloud(100, 10, 420, 270);

  ctx.fillStyle = '#000'; // black;
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150; // px;
  var step = histogramHeight / (max - 0); // px;

  var barWidth = 40; // px;
  var indent = 90; // px;
  var initialX = 150; // px;
  var initialY = 80; // px;
  var lineHeight = 16; // px;
  var scoreIndent = 5; // px;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, 0.' + Math.round(Math.random() * 10) + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY + histogramHeight - times[i] * step, barWidth, times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + lineHeight);
    ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY + histogramHeight - times[i] * step - scoreIndent);
  }

};
