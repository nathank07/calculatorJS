const container = document.querySelector('#calculator');
const screen = calculator.querySelector('.screen')
const info = calculator.querySelector('.info')
const numbers = calculator.querySelectorAll('.numbers');
const operators = calculator.querySelectorAll('.operator');
const operatorsArray = Array.prototype.slice.call(operators);
const decimalButton = calculator.querySelector('.decimal');
const negButton = calculator.querySelector('.plusminus');
const numbersArray = Array.prototype.slice.call(numbers);
let decimal = false;
numbersArray.forEach(number => {
    console.log(number.innerHTML)
    number.addEventListener('click', (event) => {
        if(screen.innerHTML != 0){
            screen.innerHTML += number.innerHTML;
        }
        else{
            screen.innerHTML = number.innerHTML;
        }
    });
});
operatorsArray.forEach(operator => {
    operator.addEventListener('click', (event) => {
        if(operator.innerHTML === "="){
            console.log(info.innerHTML + " " + screen.innerHTML + " =");
            operate(convertToOperate(info.innerHTML + " " + screen.innerHTML + " ="));
        }
        info.innerHTML = info.innerHTML + " " + screen.innerHTML + " " + operator.innerHTML;
        screen.innerHTML = "0";
        decimal = false;
    })
})

decimalButton.addEventListener('click', (event) => {
    if(decimal == false){
        decimal = true;
        screen.innerHTML += "."
    }
});

negButton.addEventListener('click', (event) => {
    if(screen.innerHTML != 0){
        if(screen.innerHTML[0] != "-"){
            screen.innerHTML = "-" + screen.innerHTML;
        }
        else{
            screen.innerHTML = screen.innerHTML.substring(1);
        }
    }
})


function add(a, b){
    return Number(a) + Number(b);
}
function subtract(a, b){
    return a - b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}
function operate(string){
    opsToLook = ["+", "-", "x", "/"];
    paren = false;
    num = "";
    nums = [];
    ops = [];
    for(char in string){ //makes 2 arrays of numbers and ops in order
        if(paren == false){
            if(string[char] === "("){
                paren = true;
            }
            if(opsToLook.includes(string[char])){
                ops.push(string[char]);
            }
        }else{ 
            if(paren == true){
                if(string[char] === ")"){
                    nums.push(num)
                    num = "";
                    paren = false;
                }
                 else{
                    num += string[char];
                }
        }
    }   
    }
    final = ""
    for(n in nums){
        if(final == ""){
            if(ops[n] == "+"){
                final = add(nums[n], nums[Number(n) + 1]);
            }
            if(ops[n] == "-"){
                final = subtract(nums[n], nums[Number(n) + 1]);
            }
            if(ops[n] == "x"){
                final = multiply(nums[n], nums[Number(n) + 1]);
            }
            if(ops[n] == "/"){
                final = divide(nums[n], nums[Number(n) + 1]);
            }
        }else{
            if(ops[n] == "+"){
                final = add(final, nums[Number(n) + 1]);
            }
            if(ops[n] == "-"){
                final = subtract(final, nums[Number(n) + 1]);
            }
            if(ops[n] == "x"){
                final = multiply(final, nums[Number(n) + 1]);
            }
            if(ops[n] == "/"){
                final = divide(final, nums[Number(n) + 1]);
            }
        }
    }
    console.log(final);
    console.log(`operate ${newString}!`)
}

//This function converts the string into something the operate function
//can go through and evaluate (deletes useless decimals, spaces)
function convertToOperate(string){
    const numbersArr = ["1","2","3","4","5","6","7","8","9","0"];
    const opsArr = ["+", "-", "x", "/", "="];
    newString = "("
    for(char in string){
        console.log(string[char]);
        if(numbersArr.includes(string[char])){
            newString += string[char];
        }
        if(opsArr.includes(string[char])){
            console.log("the character " + string[Number(char) - 1])
            if(string[Number(char) - 1] == " " && string[Number(char) + 1] == " "){
                newString = newString + ")" + string[char] + "("
            }
            else{
                if(string[char] === "="){
                    newString += ")"
                }
                newString += string[char];
            }
        }
        if(string[char] == "." && numbersArr.includes(string[Number(char) + 1]) === true){
            newString += "."
        }
    }
    return newString;
}
