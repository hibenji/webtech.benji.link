// PART A ========================================
// Higher-order function: takes another function as an argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

// Simple functions to pass in
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

// Using the higher-order function
console.log(applyOperation(5, 3, add));      // Output: 8
console.log(applyOperation(5, 3, multiply)); // Output: 15


// First Class function using an array of functions
const operations = [
  (x) => x + 2,
  (x) => x * 2,
  (x) => x ** 2
];

const num = 3;
console.log(operations[2](num)); // This will return 9 (3 squared)


// PART B ========================================
// Closure example
function createCounter() {
  let count = 0; // variable inside parent function

  return function() { // inner function (closure)
    count++; // can access `count` even after parent has returned
    console.log(`Current count: ${count}`);
  };
}

const counter = createCounter(); // `createCounter` is executed once

counter(); // Output: Current count: 1
counter(); // Output: Current count: 2
counter(); // Output: Current count: 3



// PART C ========================================
// Regular (uncurried) function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // Output: 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // Output: 6
