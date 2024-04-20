// content.js

// Function to add style based on key press
function addStyleForDice(color) {
    const elements = document.querySelectorAll('.dice-wrapper');
    elements.forEach(element => {
        const child = element.firstElementChild;
        if (child) {
            child.style.setProperty('color', color, 'important');
        }
    });
}

// Funtion to save color to local storage:
function SaveColorPreference(color) {
    localStorage.setItem('diceColor', color);
    localStorage.removeItem('diceColors');
}

function SaveColorRandomPreference(excludeColor) {
    localStorage.setItem('diceColors', excludeColor);
    localStorage.removeItem('diceColor');
}

function ApplyColorRandomPreference(excludeColor) {
    const colors = ['green', 'yellow', 'orange', 'purple', 'blue', 'red'];
    const filteredColors = colors.filter(color => color !== excludeColor);

    const elements = document.querySelectorAll('.dice-wrapper');
    elements.forEach(element => {
        const child = element.firstElementChild;
        if (child && child.style.color === excludeColor) {
            const randomColor = filteredColors[Math.floor(Math.random() * filteredColors.length)];
            child.style.setProperty('color', randomColor, 'important');
            console.log(child.style.color + " -> " + randomColor)
        }
    });
}

// Function to load color preference from local storage
function loadColorPreference() {
    const color = localStorage.getItem('diceColor');
    if (color) {
        addStyleForDice(color);
    }
    const colorExclude = localStorage.getItem('diceColors');
    if (colorExclude) {
        ApplyColorRandomPreference(colorExclude)
    }
}

// Event listener for key presses
document.addEventListener('keydown', function (event) {
    // Check the key pressed and apply corresponding style
    console.log('Key pressed:', event.key);

    switch (event.key.toUpperCase()) {
        case '0':
            SaveColorRandomPreference('unset'); // Remove style for everything
            break;
        case '1':
            SaveColorRandomPreference('red'); // Remove style for red
            break;
        case '2':
            SaveColorRandomPreference('blue'); // Remove style for blue
            break;
        case '3':
            SaveColorRandomPreference('purple'); // Remove style for purple
            break;
        case '4':
            SaveColorRandomPreference('orange'); // Remove style for orange
            break;
        case '5':
            SaveColorRandomPreference('green'); // Remove style for green
            break;
        case '6':
            SaveColorRandomPreference('gold'); // Remove style for yellow
            break;
        case 'A':
            SaveColorPreference('red'); // Apply style for red
            break;
        case 'S':
            SaveColorPreference('blue'); // Apply style for blue
            break;
        case 'D':
            SaveColorPreference('purple'); // Apply style for purple
            break;
        case 'F':
            SaveColorPreference('orange'); // Apply style for orange
            break;
        case 'G':
            SaveColorPreference('green'); // Apply style for green
            break;
        case 'H':
            SaveColorPreference('gold'); // Apply style for yellow
            break;
        default:
            break;
    }
});

// Check for the existence of the roll button using setInterval
const interval = setInterval(function () {
    const rollButton = document.querySelector('.loader.hide');
    if (rollButton) {
        clearInterval(interval); // Stop checking once the button is found
        loadColorPreference(); // Load color preference once the button is found
    }
}, 80); // Check every second for the button