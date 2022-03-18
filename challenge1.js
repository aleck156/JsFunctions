'use strict';

/*


*/

const btn = document.querySelector('.poll');

const displayPrompt = function () {
  const userInput = prompt(`What is your favourite programming language?
  0: JavaScript
  1: Python
  2: Rust
  3: C++
  (Write option number): `);
  return Number(userInput);
};

const updateAnswers = function (num) {
  num >= 0 && num < this.answers.length
    ? this.answers[num]++
    : console.log(`Number ${num} is out of bounds, nothing changed`);
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer(type) {
    const userInput = displayPrompt();
    updateAnswersPoll(userInput);
    this.dispalyResults(type);
  },

  dispalyResults(type = 'array') {
    type === 'string'
      ? console.log(`Poll results are ${this.answers.join(',')}.`)
      : console.log(this.answers);
  },
};

const updateAnswersPoll = updateAnswers.bind(poll);

btn.addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS

const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

const type1 = 'string';
const type2 = 'array';
