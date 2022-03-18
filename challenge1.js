'use strict';

/*


*/

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
  this.answers ? this.answers[num]++ : (this.answers[num] = 1);
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const userInput = displayPrompt();
    updateAnswersPoll(userInput);
    console.log(this.answers);
  },
};

const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

// poll.registerNewAnswer();
const updateAnswersPoll = updateAnswers.bind(poll);
poll.registerNewAnswer();
