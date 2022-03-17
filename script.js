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
book.call(eurowings, 23, 'Tiger Woods');
console.log(eurowings);
