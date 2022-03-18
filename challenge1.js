'use strict';

/*


*/

const btn = document.querySelector('.poll');

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  displayPrompt() {
    let optionsStr = '';
    for (const opt of this.options) {
      optionsStr += `\n${opt}`;
    }
    const userInput = prompt(
      `${this.question}${optionsStr}\n(Write option number): `
    );
    return Number(userInput);
  },

  updateAnswers(num) {
    num >= 0 && num < this.answers.length
      ? this.answers[num]++
      : console.log(`Number ${num} is out of bounds, nothing changed`);
  },

  registerNewAnswer() {
    const userInput = this.displayPrompt();
    this.updateAnswers(userInput);
    this.dispalyResults();
    this.dispalyResults('string');
  },

  dispalyResults(type = 'array') {
    type === 'string'
      ? console.log(`Poll results are ${this.answers.join(',')}.`)
      : console.log(this.answers);
  },

  clearAnswers() {
    this.answers = new Array(4).fill(0);
  },
};

// const updateAnswersPoll = updateAnswers.bind(poll);

btn.addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS
// this is what user typed in
const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

const type1 = 'string';
const type2 = 'array';

const registerNewAnswer = poll.registerNewAnswer.bind(poll);

// poll.dispalyResults.bind({ answers: testData1 })(type1);
// poll.dispalyResults.bind({ answers: testData1 })(type2);
// poll.dispalyResults.bind({ answers: testData2 })(type1);
// poll.dispalyResults.bind({ answers: testData2 })(type2);

poll.clearAnswers();
