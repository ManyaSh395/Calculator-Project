document.addEventListener("DOMContentLoaded", () => {

    const screen = document.querySelector(".screen");
    const digitButtons = document.querySelectorAll(".digit");
    const operatorButtons = document.querySelectorAll(".operator");
    const clear = document.querySelector(".clear");
    const backspace = document.querySelector(".backspace");
    const equalsButton = document.querySelector(".equals");

    let num1 = "";
    let num2 = "";
    let currentOperator = "";
    let outputDisplay = false;

    const add = (a,b) => {
        return (a + b);
    }

    const sub = (a,b) => {
        return (a - b);
    }

    const multiply = (a,b) => {
        return (a * b);
    }

    const divide = (a,b) => {
        if(b === 0){
            return "SYNTAX ERROR";
        }
        else {
            return (a / b);
        }
    }

    const operate = (a, b, operator) => {
        a = Number(a);
        b = Number(b);
        switch(operator){
            case "+":
                return add(a,b);
            case "-":
                return sub(a,b);
            case "*":
                return multiply(a,b)
            case "/":
                return divide(a,b);
            default:
                return null;
        }
    }

    digitButtons.forEach(button => {
        button.addEventListener("click", () => { 
            if(outputDisplay){  // If the output is displayed from a previous calc using '=', reset the screen or clear the display to start fresh
                screen.innerText = "";
                outputDisplay = false;
            }
            screen.textContent += button.innerText; //add the clicked digit to screen
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if(num1 && currentOperator != ""){
                num2 = screen.textContent;
                let result = operate(num1, num2, currentOperator);
                screen.textContent = result;
                num1 = result; // Update num1 with the result for further calculations
                outputDisplay = true;
            } else {
                num1 = screen.textContent; // Store the first number
            }
            currentOperator = button.textContent; // Store the operator
            screen.textContent = ""; // Clear the screen for the next number input
        });
    });

    equalsButton.addEventListener("click", () => {
        if(num1 && currentOperator && screen.textContent){
            num2 = screen.textContent;
            let result = operate(num1, num2, currentOperator);
            screen.textContent = result;
            currentOperator = ""; // Reset operator after calculation
            outputDisplay = true; // Set output display to true to indicate a result is shown
        }
    });

    clear.addEventListener("click", () => {
        screen.textContent = "0";
        num1 = "";
        num2 = "";
        currentOperator = "";
        outputDisplay = false; // Reset output display
    });

    backspace.addEventListener("click", () => {
        let currentText = screen.textContent;
        if(outputDisplay || currentText === "0"){
            screen.textContent = "0"; // If output is displayed or screen is "0", reset to "0"
            outputDisplay = false; 
            return;
        }
        if(currentText.length > 1){
            screen.textContent = currentText.slice(0, -1); // Remove last character
        } else {
            screen.textContent = "0"; // If only one character left, reset to "0"
        }
    });

});
