const colors = ['blue', 'red', 'green', 'orange', 'purple', 'gray'];
let currentColor = '';
let counter = 0;
let cells = [];
let interval;

function generateGrid() {
  const main = document.createElement('main');
  document.querySelector('.page').insertBefore(main, document.querySelector('#panel'));
 
  // make a grid 6*6
  for (let i = 0; i < 36; i++) {
    let div = document.createElement('div');
    div.setAttribute('class', 'cell');
    // assign random color
    let color = assignRandomColor();
    div.classList.add(color);
    main.appendChild(div);
  }
  cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', pickCell);
  }
}

// Each cell is assigned a random colour, between blue, red, green, orange, purple and gray.
function assignRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

function setTimer() {
  let timer = document.createElement('p');
  document.querySelector('.page').appendChild(timer);
  timer.setAttribute('id', 'timer');
  counter = 0;
  timer.innerText = counter;
}

function displayTimer() {
   timer.innerText = counter;
   counter++;
}

// A program generates a random color that a user has to find and displays its name 
function generateRandomColor() {
  let randomColor = assignRandomColor();
  let currentColors = [];
  for(let i = 0; i < cells.length; i++) {
    let cellColor = cells[i].getAttribute('class').replace('cell', '');
    cellColor = cellColor.trim();
    if(!currentColors.includes(cellColor)) {
      currentColors.push(cellColor);
    }
  }
  if(currentColors.length < 2) {
    //console.log('Game over!');
    showMessage();
    clearInterval(interval);
    counter = 0;
    
  }
  while(!currentColors.includes(randomColor) && currentColors.length > 1) {
    randomColor = assignRandomColor();
  }
  
  currentColor = randomColor;
  panel.innerText = randomColor;
  panel.style.color = randomColor;
  return;
}

function pickCell(e) {
  const classes = this.getAttribute('class');
  const panel = document.querySelector('#panel');
  const errorMsg = document.querySelector('#error');
  if(errorMsg.innerText !== '') {
    errorMsg.innerText = '';
  }
  for(let i = 0; i < colors.length; i++) {
    if(classes.includes(colors[i])) {
      if(!currentColor) {
        panel.innerText = colors[i];
        panel.style.color = colors[i];
        currentColor = colors[i];
        return;
      }
      if(currentColor === colors[i]) {
        currentColor = '';
        this.classList.remove(colors[i]);
        this.classList.add('black');
        generateRandomColor();
      } else {
        errorMsg.innerText = 'Error!';
      }
    }
  }
}

function showMessage() {
  const messageId = document.querySelector('#message');
  messageId.innerText = 'Congratulations! Your time is ' + counter + ' seconds';
  messageId.style.display = 'block';
  const button = document.createElement('button');
  button.innerText = 'Start again?';
  button.setAttribute('id', 'btnStartAgain');
  message.append(button);
  button.addEventListener('click', start);
}

function endGame() {
  // interval = setInterval(displayTimer, 1000);
  
  for(let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', pickCell);  
  }
  var main = document.getElementsByTagName("main")[0]; 
  main.remove(); 
  document.querySelector('#panel').innerText = '';
}

function start() {
  endGame();
  document.querySelector('#message').style.display = 'none';
  interval = setInterval(displayTimer, 1000);
  generateGrid();
  generateRandomColor();
}

interval = setInterval(displayTimer, 1000);
generateGrid();
generateRandomColor();
setTimer();