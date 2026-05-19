let calculation = JSON.parse(localStorage.getItem('calculation')) || '';

displayHandle(calculation);

function updateCalculation(button){
  calculation += button.dataset.val;
  displayHandle(calculation);
}

function displayHandle(calculation){
  document.querySelector('.displayCalc').innerText = String(calculation);
}

//equals button
document.querySelector('#js-equals').addEventListener('click', () => {
  calculation = eval(calculation)
  localStorage.setItem('calculation', JSON.stringify(calculation));
  displayHandle(calculation);
})

//clear button
document.querySelector('#js-clear').addEventListener('click', () => {
  calculation = '';
  displayHandle(calculation);
})

//other buttons
document.querySelectorAll('.js-btn').forEach((button) => {
  button.addEventListener('click', () => {
    updateCalculation(button);
  })
})