import "./style.css";

/**
 * 🥴
 */
var count = 1;

if (true) {
	var count = 2;
	console.log("(var) Inside if-statement:", count);  // 2
}

console.log("(var) Outside if-statement:", count);  // 2 😱


console.log("(var) x before declaration:", x);  // undefined - no error! 😱😱
var x = 10;
console.log("(var) x after declaration:", x);  // 10

function varTest() {
	var x = 5;
	console.log("(var) Inside varTest-function:", x);
}
varTest();
console.log("(var) After varTest-function:", x);

/**
 * 🤩
 */

let total = 5;
// let total = 42;  // nope! 🚔

if (true) {
	let total = 10;
	console.log("(let) Inside if-statement:", total);
}
console.log("(let) Outside if-statement:", total);

console.log("(let) y before declaration:", y);  // Uncaught ReferenceError: can't access lexical declaration 'y' before initialization
// let y = 42;
