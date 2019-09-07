const greeting = () => {
    //alert('Good morning everyone');
}

const showKey = () => {
    //alert('Am the key man');
}

//let firstInput = document.querySelector('input');
//console.dir(firstInput);

//firstInput.onfocus = showKey;
/*
let button = document.querySelector('#btn');

const firstFunction = () => {
    console.log('Hello Dear');
}
const secondFunction = () => {
    console.log('Hey Dear')
}
const thirdFunction = () => {
    console.log('Hello Honey')
}
button.onclick = firstFunction;
firstInput.onkeypress = secondFunction;
secondInput.onmouseenter = thirdFunction;

let answer = document.querySelector('#answer')


const sum = () => {
    let firstValue = parseFloat(firstInput.value);
    let secondValue = parseFloat(secondInput.value);
    let sumOfNums = firstValue + secondValue;
    
    answer.innerText = `This is the Answer :${sumOfNums}`
}


const copy = () => {
    secondInput.value = firstInput.value
    answer.innerHTML = '<h1>' + firstInput.value + '</h1>';
    answer.innerHTML = '<P>' + secondInput.value + '</P>';
}
button.onkeypress = copy;
*/

let head = document.querySelector('h1');
let para = document.querySelector('p');
let firstInput = document.querySelector('#input-1');
let secondInput = document.querySelector('#input-2');

const enter = () => {
    h1.innerText = firstInput.value;
    para.innerText = secondInput.value;
}