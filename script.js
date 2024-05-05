const tempInput = document.getElementById('temp-input');
const inputUnitSelect = document.getElementById('input-unit');
const outputUnitSelect = document.getElementById('output-unit');
const convertBtn = document.getElementById('convert-btn');
const resultBox = document.getElementById('result-box');
const errorMsg = document.getElementById('error-msg');
const recentConversions = document.getElementById('recent-conversions');
const clearHistoryBtn = document.getElementById('clear-history');
const themeToggleBtn = document.getElementById('theme-toggle');

const MAX_RECENT_CONVERSIONS = 5; 
const MAX_INPUT_HISTORY = 5;

const toggleThemeBtn = document.getElementById('theme-toggle');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Save theme preference in local storage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// // Load theme from local storage on page reload
// document.addEventListener('DOMContentLoaded', () => {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     body.classList.add(savedTheme + '-theme');
// });
// // themeToggleBtn.addEventListener('click', switchTheme);
// function switchTheme() {
//     const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light'; 
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

//     console.log('Before:', document.body.classList); 
//     document.body.classList.replace(currentTheme, newTheme);
//     console.log('After:', document.body.classList); 

//     localStorage.setItem('theme', newTheme); 
// }

// Conversion Logic
function convertTemperature() {
const inputValue = parseFloat(tempInput.value);
const inputUnit = inputUnitSelect.value;
const outputUnit = outputUnitSelect.value;

  // Input Validation
if (isNaN(inputValue)) {
    errorMsg.textContent = "Please enter a valid number.";
    resultBox.textContent = ""; 
    return;
}

  // Temperature Limits (Optional)
if ((inputUnit === 'F' && inputValue < -459.67) ||
    (inputUnit === 'C' && inputValue < -273.15) ||
    (inputUnit === 'K' && inputValue < 0)) {
    errorMsg.textContent = "Temperature cannot go below absolute zero.";
    resultBox.textContent = ""; 
    return;
}

  // Conversion Calculations
let result;
if (inputUnit === outputUnit) {
    result = inputValue; // No conversion needed
} else if (inputUnit === 'C') {
    if (outputUnit === 'F') {
      result = (inputValue * 9/5) + 32;
    } else { // outputUnit === 'K'
    result = inputValue + 273.15;
    }
} else if (inputUnit === 'F') {
    // ... Add Fahrenheit conversions
  } else { // Input unit is Kelvin
    // ... Add Kelvin conversions
}

  // Apply Lighting Effects 
applyLightingEffect(outputUnit, result);

  // Display Result
  errorMsg.textContent = ""; // Clear error message
resultBox.textContent = `${result.toFixed(2)} ${outputUnit}. Thanks for using me. Hope you feel good.`; 
}

// Lighting Effects
function applyLightingEffect(unit, temperature) {
resultBox.classList.remove('celsius', 'fahrenheit', 'kelvin', 'low', 'moderate', 'high');

resultBox.classList.add(unit);

if (temperature <= 10) { 
    resultBox.classList.add('low');
} else if (temperature >= 35) { 
    resultBox.classList.add('high');
} else {
    resultBox.classList.add('moderate');
}
}

// Event Listeners
convertBtn.addEventListener('click', convertTemperature); 
// themeToggleBtn.addEventListener('click', switchTheme);
// document.addEventListener('DOMContentLoaded', function() {
//     const themeToggleBtn = document.getElementById('theme-toggle');
// });


// Initialization
const preferredTheme = localStorage.getItem('theme') || 'light'; 
document.body.classList.add(preferredTheme); 

  // Conversion Calculations
let result;
if (inputUnit === outputUnit) {
    result = inputValue; // No conversion needed
} else if (inputUnit === 'C') {
    if (outputUnit === 'F') {
      result = (inputValue * 9/5) + 32;
    } else { // outputUnit === 'K'
    result = inputValue + 273.15;
    }
} else if (inputUnit === 'F') {
    if (outputUnit === 'C') {
      result = (inputValue - 32) * 5/9;
    } else { // outputUnit === 'K'
      result = ((inputValue - 32) * 5/9) + 273.15; 
    }
  } else { // Input unit is Kelvin
    if (outputUnit === 'C') {
    result = inputValue - 273.15;
    } else { // outputUnit === 'F'
      result = ((inputValue - 273.15) * 9/5) + 32;
    }
}

inputUnitSelect.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    const currentSelection = inputUnitSelect.selectedIndex;
    const optionsCount = inputUnitSelect.options.length;
    let newSelection;

    if (event.key === 'ArrowUp') {
        newSelection = (currentSelection - 1 + optionsCount) % optionsCount;
    } else {
        newSelection = (currentSelection + 1) % optionsCount;
    }

    inputUnitSelect.selectedIndex = newSelection;
      convertTemperature(); // Automatically trigger conversion on unit change
    }
});
  // Add listener to outputUnitSelect
outputUnitSelect.addEventListener('keydown', (event) => { 
     if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { // Check for arrow key presses
     const currentSelection = outputUnitSelect.selectedIndex; // Get currently selected index
     const optionsCount = outputUnitSelect.options.length;  // Number of options in the select
    let newSelection;
    
    if (event.key === 'ArrowUp') {
     newSelection = (currentSelection - 1 + optionsCount) % optionsCount; // Calculate new index (wrapping around)
    } else {
     newSelection = (currentSelection + 1) % optionsCount; // Calculate new index (wrapping around)
    }
    
     outputUnitSelect.selectedIndex = newSelection; // Set the new selection
     convertTemperature(); // Automatically trigger the conversion
    }
    });

function applyLightingEffect(unit, temperature) {
    const resultBox = document.getElementById('result-box'); // Get the result box element

    // 1. Remove Previous Style Classes
    resultBox.classList.remove('celsius', 'fahrenheit', 'kelvin', 'low', 'moderate', 'high');

    // 2. Apply Unit-Specific Class
    resultBox.classList.add(unit);

    // 3. Apply Temperature Range Class
    if (temperature <= 10) { 
    resultBox.classList.add('low');
    } else if (temperature >= 35) { 
    resultBox.classList.add('high');
    } else {
    resultBox.classList.add('moderate');
    }
}
