const container = document.querySelector('#calculator');
const numbers = document.querySelectorAll('.numbers');
const numbersArray = Array.prototype.slice.call(numbers);
numbersArray.forEach(number => {
    console.log(number.innerHTML)
    number.addEventListener('click', (event) => {
        console.log(number.innerHTML);
    });
});