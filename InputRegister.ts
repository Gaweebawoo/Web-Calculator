// gets display elements
const currentDisplay = document.getElementById("current") as HTMLElement;
const historyDisplay = document.getElementById("history") as HTMLElement;

// selects all calclator buttons
const buttons = document.querySelectorAll<HTMLButtonElement>("button");

// this stores the values
// what you pressed
let currentInput = '';
// what you did press
let previousInput = '';

// update numbers
function updateDisplay() {
  currentDisplay.textContent = currentInput || "0";
  historyDisplay.textContent = previousInput;
}

// registers the button clicks
function handleButtonClick(value: string) {
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
      } else {
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
      if (!currentInput.endsWith(".")) currentInput += ".";
      break;

    case "equals":
      try {
        // eslint-disable-next-line no-new-function
        const result = new Function(`return ${currentInput}`)();
        previousInput = currentInput;
        currentInput = result.toString();
      } catch {
        currentInput = "Error";
      }
      break;

    default:
      currentInput += value;
  }

  updateDisplay();
}

// Attach event listeners
buttons.forEach((btn) => {
  btn.addEventListener("click", () => handleButtonClick(btn.dataset.value!));
});

updateDisplay();
// now just type tsc "file name" in terminal and it compiles into JS