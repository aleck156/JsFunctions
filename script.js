'use strict';

const bookings = [];

// you can use any expression here
// you can use any parameter that has already been declared!
const createBooking = function (
  flightNum = '123',
  numPassengers = 0,
  price = 199.99,
  totalIncome = numPassengers * price || 500
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
    totalIncome,
  };

  console.log(booking);
  bookings.push(booking);
};

// you cannot skip arguments is not allowed!
createBooking();
createBooking('LH123');
createBooking('LH123', 100, 329.99);

// using 'undefined' is the only way
createBooking('LH123', undefined, 329.99);

const flight = 'LH234';
const jonas = {
  name: 'Thomas Anderson',
  passport: 'ATX3254125',
};

// passing properties by value stored in a call stack, and a reference to the object in a memory heap
const checkIn = function (flightNum, passenger) {
  flightNum = 'BG313';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 'ATX3254125') {
    passenger.passport += '/1';
    // alert('Check In');
  } else {
    // alert('Wrong passport!');
  }
};

checkIn(flight, jonas);

console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);
console.log(jonas);

checkIn(flight, jonas);
// 2 functions manipulate the same object ... so wrong ...

// passing by value
// passing by reference

// in javascript, there is NO passing by reference
// you'll learn that once you dive deep into how js works
// we pass a reference to a function, but not by a reference

// ------------------------------------------
// FIRST CLASS FUNCTIONS

// functions are first citizens
// functions are simply values
// functions are just another type of object
// functions are treated as values
// we can store functions in variables or properties
// pass functions as arguments to OTHER functions

// since functions are objects, and we can call methods on objects ...
// there are methods we can call on our functions too!

// ------------------------------------------
// HIGHER ORDER FUNCTION

// receives another function as an argument
// returns a new function
// ... or both xD

// all of that possible only because of first-class functions
// btn.addEventListener() is an example of HOF, where the second argument is a so-called callback function, which is being executed inside the body of HOF later, based on teh code

function count() {
  let counter = 0;
  return function () {
    counter++;
  };
}

// FIRST-CLASS FUNCTIONS vs HIGHER-ORDER FUNCTIONS (FCF vs HOF)
// FCF - a feature of a programming language, all functions are values, it's just a concept
// HOF - possible when a programming language supports FCF

// low level functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};

// HOF
// higher order function
// does not care how the supportive functions do their jobs, as long as they do it right
const transformer = function (str, fn) {
  console.log(`1. Original string: ${str}`);
  console.log(`2. Transformed string: ${fn(str)}`);
  console.log(`3. Transformed by: ${fn.name}`);
  // return fn(str);
};

transformer('testing HOF JavaScript stuff', upperFirstWord);
transformer('testing HOF JavaScript stuff', oneWord);

// Js callbacks all the time!
const high5 = function (arg1) {
  console.log(`High 5 to ${arg1}`);
};

// document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// CALLBACK FUNCTIONS ALLOW TO CREATE ABSTRACTION
// hiding details from the users
//

// ------------------------------------------
// RETURNING NEW FUNCTIONS
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet(`hey`);
greeterHey('malow');

// CLOSURES - HARD AN IMPORTANT!
greeterHey('Thomas');
greeterHey('Steven');

greet('Hello, ')('Michael');

// the same as above, but using arrow functions

const greet2 = greeting => name => console.log(`${greeting} ${name}`);

greet2('Hello 2, ')('Michael 2');

// ------------------------------------------
// 133. CALL AND APPLY METHODS
// functions are objects
// objects have methods attached to them
// thus. we can call methods on functions

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // enhanced object literals syntax
  book(flightNum, name) {
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    console.log(
      `${name} booked a seat on a ${this.airline} flight ${this.iataCode}${flightNum}`
    );
  },
};

lufthansa.book(239, 'Thomas Anderson');
lufthansa.book(635, 'John Smith');
console.log(lufthansa.bookings);

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// does not work
// book(23, 'tiger');

// manually setting 'this' context
// call, apply, bind
book.call(eurowings, 23, 'Tiger Woods');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Jane Anderson');
console.log(lufthansa);

lufthansa.book.call(eurowings, 999, 'Wake up, neo ...');

console.log(eurowings);

const swiss = {
  name: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper Janis');
console.log(swiss.bookings);

// APPLY
// does exactly the same thing
// after the thisArg, it takes an array of arguments
// rarely used in modern JS -> use call() and spread out the arguments from the array
book.apply(swiss, [584, 'Mary Cooper Janis Jr.']);
console.log(swiss.bookings);

// ------------------------------------------
// 134. BIND METHOD
// returns new function, where thisArg is bound with the argument
// we can bind with more than just thisArg
// i.e. binding function arguments!

// partial application patterns
// some parameters are already predefined
// more flexible than just default values

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW('431', 'Mick Jaeger');
console.log(eurowings);

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Aerosmith!');
console.log(eurowings);

// OBJECTS + EVENT LISTENERS
// 'this' keyword is set dynamically
const btnBuy = document.querySelector('.buy');

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// this does NOT WORK PROPERLY
// btnBuy.addEventListener('click', lufthansa.buyPlane);

// fixing it
// btnBuy.addEventListener('click', () => lufthansa.buyPlane());
btnBuy.addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// .bind() returns a new function, that will be called by event handler

// partial application
// preset some of the parameters
// the order of presetted arguments DO MATTER
// BE CAREFUL HERE!
const addTax = (rate, value) => value * (1 + rate / 100);
console.log(addTax(10, 200));

const addVAT = addTax.bind(undefined, 23);

console.log(addVAT(700));

const addTaxRate = function (rate) {
  return function (value) {
    return value * (1 + rate / 100);
  };
};

const addVAT2 = addTaxRate(23);

console.log(addVAT2(100));

// ------------------------------------------
// 136. IMMEDIATELY INVOKED FUNCTION EXPRESSIONS - IIFE
// disappears once it'b being calles
// useful for async/await
// functions create scope

const runOnce = function () {
  console.log(`This will never run again`);
};

// runOnce();

(function () {
  console.log(`This will never run again #1`);
})();

(() => console.log(`This will never run again #2`))();
