const SomaFunc = require("./func/soma");
const SubFunc = require("./func/sub");
const MultiFunc = require("./func/multi");
const DivFunc = require("./func/div");

const num1 = 10;
const num2 = 10;

console.log("Soma " + SomaFunc(num1, num2));
console.log("Subtração " + SubFunc(num1, num2));
console.log("Multiplicação " + MultiFunc(num1, num2));
console.log("Divisão " + DivFunc(num1, num2));