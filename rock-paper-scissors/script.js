let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;



//button moves
document.querySelectorAll('.js-btn').forEach((buttun) => {
  buttun.addEventListener('click', () => {
    let playerMove = buttun.dataset.val;
    playGame(playerMove);
  })
})

//reset button 
document.querySelector('#reset-btn').addEventListener('click', () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
})

//AutoPlay button
document.querySelector('#autoplay-btn').addEventListener('click', () => {
  autoPlay();
})

//AutoPlay function
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

//playing with keys
document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }
  else if(event.key === 'p'){
    playGame('Paper');
  }
  else if(event.key === 's'){
    playGame('Scissors');
  }
});



function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function pickMove(){
  const randomNumber = Math.random();
  let move = '';

  if(0 <= randomNumber && randomNumber < 1/3){
    move = 'Rock';
  }
  else if(1/3 <= randomNumber && randomNumber < 2/3){
    move = 'Paper';
  }
  else{
    move = 'Scissors';
  }
  return move;
};


function playGame(playerMove){
  const computerMove = pickMove();

  let result = '';

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
  else if(result == 'You lose.'){
    score.losses ++;
  }
  else if(result == 'Tie.'){
    score.ties ++;
  }


  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="thumbnails/${String(playerMove)}-emoji.png" class="move-icon">
<img src="thumbnails/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

