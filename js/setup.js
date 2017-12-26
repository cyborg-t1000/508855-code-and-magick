// Файл setup.js
'use strict';

window.Setup = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var firstNames = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var familyNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var coatColors = {
    current: 0,
    choice: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ]
  };

  var eyesColors = {
    current: 0,
    choice: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ]
  };

  var fireballColors = {
    current: 0,
    choice: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ]
  };

  // Нажатие на элемент .setup-open удаляет класс hidden
  // у блока setup
  var userDialog = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupWizard = setup.querySelector('.setup-wizard');
  var coat = setupWizard.querySelector('.wizard-coat');
  var eyes = setupWizard.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var setupTop;
  var setupLeft;

  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: getRandomValue(firstNames) + ' ' + getRandomValue(familyNames),
      coatColor: getRandomValue(coatColors),
      eyesColor: getRandomValue(eyesColors)
    };
  }

  var similarListElement = userDialog.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var makeFragment = function () {
    var fragment = document.createDocumentFragment();
    for (i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    return fragment;
  };

  similarListElement.appendChild(makeFragment());

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupTop = setup.style.top;
    setupLeft = setup.style.left;
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setup.style.top = setupTop;
    setup.style.left = setupLeft;
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  coat.addEventListener('click', function () {
    window.colorizeElement(coat, coatColors, fillElement);
  });

  eyes.addEventListener('click', function () {
    window.colorizeElement(eyes, eyesColors, fillElement);
  });

  fireballWrap.addEventListener('click', function () {
    window.colorizeElement(fireballWrap, fireballColors, changeElementBackground);
  });

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
      evt.target.addEventListener('dragend', function () {
        artifactsElement.style.outline = '';
      });
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    if (evt.target.tagName.toLowerCase() === 'div') {
      if (evt.target.children.length === 0) {
        evt.target.appendChild(draggedItem.cloneNode(true));
      }
    }
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
