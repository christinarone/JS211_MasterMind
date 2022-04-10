'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let hints1 = 0
  let hints2 = 0

  let guessArray = guess.split("")
  let solutionArray = solution.split("")

  for(let i = 0; i < guess.length; i++){

    if (guessArray[i] === solutionArray[i]){
      hints1++
      guessArray[i]=0
      solutionArray[i]=1
    }
  }
  
  for(let i = 0; i < guess.length; i++){
    for(let j = 0; j < solution.length; j++){
      if (guessArray[i]=== solutionArray[j]){
        hints2++
        guessArray[i]=0
        solutionArray[j]=1
      }
    }
  }
  
  return hints1 + '-' + hints2
}

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess === solution){
    console.log('you win')
    return "You guessed it!"
  }
  board.push(guess)
  generateHint(guess)
  



  
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}