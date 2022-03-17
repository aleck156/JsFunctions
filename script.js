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
