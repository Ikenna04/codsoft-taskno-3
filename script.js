// VARIABLES
const clearBtn = document.querySelector('[data-clear]');
const delBtn = document.querySelector('[data-delete]');
const operands = document.querySelectorAll('[data-operand]');
const operators = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equal]');
const screen = document.querySelector('.screen');

let firstNumber = '',
	secondNumber = '',
	operator = '',
	result;

// FNXS
// Append Number
const appendNumber = number => {
	if (!operator) {
		if (number == '.') {
			if (!firstNumber.includes('.')) {
				firstNumber += number;
				checkScreen(firstNumber);
			}
		} else {
			firstNumber += number;
			checkScreen(firstNumber);
		}
	} else {
		if (operator) {
			if (number == '.') {
				if (!secondNumber.includes('.')) {
					secondNumber += number;
					checkScreen(secondNumber);
				}
			} else {
				secondNumber += number;
				checkScreen(secondNumber);
			}
		} else {
			firstNumber = screen.innerText;
			if (number == '.') {
				if (!secondNumber.includes('.')) {
					secondNumber += number;
					checkScreen(secondNumber);
				}
			} else {
				secondNumber += number;
				checkScreen(secondNumber);
			}
		}
	}
};

// Compute Functions
const computeResult = () => {
	let result = 0;

	switch (operator) {
		case '+':
			result = parseFloat(firstNumber) + parseFloat(secondNumber);
			break;

		case '÷':
			result = parseFloat(firstNumber) / parseFloat(secondNumber);
			break;

		case '×':
			result = parseFloat(firstNumber) * parseFloat(secondNumber);
			break;

		case '-':
			result = parseFloat(firstNumber) - parseFloat(secondNumber);
			break;

		default:
			result = parseFloat(firstNumber);
			break;
	}

	firstNumber = result;
	secondNumber = '';
	operator = '';

	if (!result) {
		screen.innerText = 'Err';
	} else {
		checkScreen(result);
	}
};

// Check Screen
const checkScreen = input => {
	if (Array.from(String(input)).length >= 6) {
		screen.innerText = Number(Number(input).toPrecision(2)).toExponential();
	} else {
		screen.innerText = input;
	}
};

// Clear Screen
const clearScreen = () => {
	firstNumber = '';
	secondNumber = '';
	operator = '';
	screen.innerText = '0';
};

// | DEL FNX
const deleteLast = () => {
	if (!operator && screen.innerText) {
		number = firstNumber.split('');
		number.pop();
		firstNumber = number.join('');
		checkScreen(firstNumber);

		number = '';
	} else if (secondNumber) {
		number = secondNumber.split('');
		number.pop();
		secondNumber = number.join('');
		checkScreen(secondNumber);
	}
};

// Add an Operator
const addOperator = _operator => {
	if (!operator) {
		operator = _operator;
		_operator = '';
	} else {
		computeResult();
		operator = _operator;
		_operator = '';
	}
};

// Event Listeners
operands.forEach(operand =>
	operand.addEventListener('click', e => appendNumber(e.target.innerText))
);

operators.forEach(operator =>
	operator.addEventListener('click', e => addOperator(e.target.innerText))
);

equalsBtn.addEventListener('click', computeResult);

delBtn.addEventListener('click', deleteLast);

clearBtn.addEventListener('click', clearScreen);
