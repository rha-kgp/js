let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let randomNumber = '';
let computerMove = '';
let result = '';

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickMove(){
  randomNumber = Math.random();

  if(0 <= randomNumber && randomNumber < 1/3){
    computerMove = 'Rock';
  }
  else if(1/3 <= randomNumber && randomNumber < 2/3){
    computerMove = 'Paper';
  }
  else{
    computerMove = 'Scissors';
  }
};


function playGame(playerMove){
  
  if(playerMove == 'Rock'){
    if(computerMove === 'Rock'){
      result = 'Tie.'; 
    } 
    else if (computerMove === 'Paper'){
      result = 'You lose.';
    } 
    else if(computerMove === 'Scissors'){
      result = 'You win.';
    } 
  }

  else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
      result = 'You win.'; 
    } 
    else if (computerMove === 'Paper'){
      result = 'Tie.';
    } 
    else if(computerMove === 'Scissors'){
      result = 'You lose.';
    } 
  }

  else if(playerMove === 'Scissors'){
    if(computerMove === 'Rock'){
      result = 'You lose.'; 
    } 
    else if (computerMove === 'Paper'){
      result = 'You win.';
    } 
    else if(computerMove === 'Scissors'){
      result = 'Tie.';
    }
  }

  if(result == 'You win.'){
    score.wins ++;
  }
  else if(score == 'You lose.'){
    score.losses ++;
  }
  else{
    score.ties ++;
  }


  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You ${playerMove} - ${computerMove} Computer`;
}


document.querySelectorAll('.js-btn').forEach((buttun) => {
  buttun.addEventListener('click', () => {
    pickMove();
    let playerMove = buttun.dataset.val;
    playGame(playerMove);
  })
})

document.querySelector('#reset-btn').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
})