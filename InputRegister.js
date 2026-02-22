// gets display elements
var currentDisplay = document.getElementById("current");
var historyDisplay = document.getElementById("history");
// selects all calclator buttons
var buttons = document.querySelectorAll("button");
// this stores the values
// what you pressed
var currentInput = '';
// what you did press
var previousInput = '';
// update numbers
function updateDisplay() {
    currentDisplay.textContent = currentInput || "0";
    historyDisplay.textContent = previousInput;
}
// registers the button clicks
function handleButtonClick(value) {
    switch (value) {
        // clears everything
        case "AC":
            currentInput = "";
            previousInput = "";
            break;
        // goes back a number
        case "back":
            currentInput = currentInput.slice(0, -1);
            break;
        // divides a number by 100
        case "percent":
            currentInput = (parseFloat(currentInput) / 100).toString();
            break;
        // changes a number negative
        case "negative":
            if (currentInput.startsWith("-")) {
                currentInput = currentInput.slice(1);
            }
            else {
                currentInput = "-" + currentInput;
            }
            break;
        // defines divide
        case "divide":
            currentInput += "/";
            break;
        // defines multiply
        case "multiply":
            currentInput += "*";
            break;
        // defines minus
        case "minus":
            currentInput += "-";
            break;
        // defines plus
        case "plus":
            currentInput += "+";
            break;
        // you guessed it, defines dot
        case "dot":
            if (!currentInput.endsWith("."))
                currentInput += ".";
            break;
        case "equals":
            try {
                // eslint-disable-next-line no-new-func
                var result = new Function("return ".concat(currentInput))();
                previousInput = currentInput;
                currentInput = result.toString();
            }
            catch (_a) {
                currentInput = "Error";
            }
            break;
        default:
            currentInput += value;
    }
    updateDisplay();
}
// Attach event listeners
buttons.forEach(function (btn) {
    btn.addEventListener("click", function () { return handleButtonClick(btn.dataset.value); });
});
updateDisplay();
