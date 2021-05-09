
//--Functions-----------------------------------------------------------------------

const handleDigit = (digit) => {
    if (display.innerText.charAt(0) === "0" || operating) {
        display.innerText = digit;
        operating = false;
    } else {
        display.innerText += digit;
    }
}

const handleOperator = (op) => {
    operand = display.innerText;
    operand2 = "";
    operator = op;
    operating = true;
}

const handleClearDisplay = (event, entry = false) => {
    display.innerText = "0";
    if (!entry) {
        operator = "";
        operand = "";
        operand2 = "";
    }
}

const handleEquals = () => {
    let ope,
        ope2; //--operands

    if (operand2 == "") { //--1st equals pressing
        ope = operand;
        ope2 = operand2 = display.innerText;
    } else { //--consecutive equals pressings (repeat oeparation with last operad2)
        ope = operand = display.innerText;
        ope2 = operand2;
    }
    ope = parseInt(ope);
    ope2 = parseInt(ope2);
    
    switch (operator) {
        case "+": display.innerText = ope + ope2; break;
        case "-": display.innerText = ope - ope2; break;
        case "*": display.innerText = ope * ope2; break;
        case "/": display.innerText =
            ( ope2 ? Math.floor(ope / ope2 ) : 0); break;
    }
}


//--DOM setup------------------------------------------------------------------------

//--Global vars
let operand = "",
    operand2 = "",
    operator = "",
    operating = false; //--true when operator is pressed, false when equals/clear is pressed

//--Display
const display = document.getElementById("display");
display.innerText = 0;

//--Digits
const digits = document.getElementsByClassName("digit");
for (dig of digits) {
    dig.addEventListener("click", 
        event => handleDigit(event.target.innerText)
    );
}

//--Operators
const operators = document.getElementsByClassName("operator");
for (ope of operators) {
    ope.addEventListener("click", 
        event => handleOperator(event.target.innerText)
    );
}

//--Clear
const clearEntry = document.getElementById("btnClearEntry");
clearEntry.addEventListener("click", event => handleClearDisplay(event, true));

const clear = document.getElementById("btnClear");
clear.addEventListener("click", handleClearDisplay);

//--Equals Button
const equals = document.getElementById("btnEquals");
equals.addEventListener("click", handleEquals);