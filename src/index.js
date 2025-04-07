import { luhnCheck } from './validator';
import { detectCardType, cardTypes } from './card-types';
import './styles/main.css';


const cardInput = document.getElementById('card-number');
const validateBtn = document.getElementById('validate-btn');
const result = document.getElementById('result');
const cardImage = document.getElementById('card-image');

validateBtn.addEventListener('click', () => {
  const cardNumber = cardInput.value.trim();
  
  if (!cardNumber) {
    result.textContent = 'Пожалуйста, введите номер карты';
    cardImage.src = '';
    return;
  }

  const isValid = luhnCheck(cardNumber);
  const cardType = detectCardType(cardNumber);

  if (isValid && cardType) {
    result.textContent = `Valid ${cardType} card`;
    cardImage.src = require(`./assets/images/${cardTypes[cardType].image}`);

    cardImage.style.display = 'block';
  } else {
    result.textContent = 'Неверный номер карты';
    cardImage.src = '';
    cardImage.style.display = 'none';
  }
});