/*
    Experiment 2: Mathematical Application for Kids (Math Sprint Game)
    Author: Amey Thakur
    Batch: B3
    Roll No: 50
    Subject: Human Machine Interaction (CSL801)
    Date: 26/12/2025

    This JavaScript file contains the core logic for the Math Sprint Game.
    It manages the application state, user interactions, and game lifecycle.
    
    Key Functionalities:
    1. DOM Manipulation: Dynamic updates to the UI based on game state (Splash, Countdown, Game, Score pages).
    2. Equation Generation: Algorithmically creates simple mathematical equations with controlled randomness for difficulty.
    3. Game Loop: Manages the countdown, timer, and equation scrolling mechanism.
    4. Score Management: Calculates penalties, tracks final time, and persists 'Best Scores' using localStorage.
    5. Event Handling: Listens for user input (clicks) to register answers and navigation.
*/

// --- DOM Elements Selection ---
// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');

// Components
const countdown = document.querySelector('.countdown');
const itemContainer = document.querySelector('.item-container');
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');

// Score Elements
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// --- Game State Variables ---
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Loop Flags
let valueY = 0;
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

/**
 * Updates the DOM to display the best scores retrieved from local storage.
 * Iterates through the stored scores and updates the corresponding UI elements.
 */
function bestScoresToDOM() {
    bestScores.forEach((bestScore, index) => {
        const bestScoreEl = bestScore;
        bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
    });
}

/**
 * Retrieves the 'bestScores' array from localStorage.
 * If data exists, it parses it; otherwise, initializes defaults and saves them.
 */
function getSavedBestScores() {
    if (localStorage.getItem('bestScores')) {
        bestScoreArray = JSON.parse(localStorage.getItem('bestScores'));
    } else {
        bestScoreArray = [
            { questions: 10, bestScore: finalTimeDisplay },
            { questions: 25, bestScore: finalTimeDisplay },
            { questions: 50, bestScore: finalTimeDisplay },
            { questions: 99, bestScore: finalTimeDisplay },
        ];
        localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
    }
    bestScoresToDOM();
}

/**
 * Updates the best score for the current question amount if the new time is better.
 * Persists the updated array to localStorage.
 */
function updateBestScore() {
    bestScoreArray.forEach((score, index) => {
        // Select correct Best Score to update based on question amount
        if (questionAmount == score.questions) {
            // Return the stored best score as a number
            const savedBestScore = Number(bestScoreArray[index].bestScore);
            // Update if the new finalScore is less or replacing zero
            if (savedBestScore === 0 || savedBestScore > finalTime) {
                bestScoreArray[index].bestScore = finalTimeDisplay;
            }
        }
    });
    // Update Layout and Save to Local Storage
    bestScoresToDOM();
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}

/**
 * Resets all game state variables and UI elements to their initial state.
 * Prepares the application for a new round.
 */
function playAgain() {
    gamePage.addEventListener('click', startTimer);
    scorePage.hidden = true;
    splashPage.hidden = false;
    equationsArray = [];
    playerGuessArray = [];
    valueY = 0;
    playAgainBtn.hidden = true;
}

/**
 * Displays the Score Page and updates the UI with the round's statistics.
 * Shows base time, penalties earned, and the final calculated time.
 */
function showScorePage() {
    // Reveal Score Page after a slight delay
    setTimeout(() => {
        playAgainBtn.hidden = false;
    }, 1000);
    gamePage.hidden = true;
    scorePage.hidden = false;
}

/**
 * Formats the raw time values into display strings (e.g., "5.4s").
 * Triggers the best score update logic.
 */
function scoresToDOM() {
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    updateBestScore();
    // Scroll to Top and Show Score Page
    itemContainer.scrollTo({ top: 0, behavior: 'instant' });
    showScorePage();
}

/**
 * Checks if the player has answered all questions.
 * Stops the timer and calculates the final score.
 */
function checkTime() {
    if (playerGuessArray.length == questionAmount) {
        clearInterval(timer);
        // Calculate Score: Base time + Penalty (0.5s per mistake)
        equationsArray.forEach((equation, index) => {
            if (equation.evaluated === playerGuessArray[index]) {
                // Correct Answer - No Penalty
            } else {
                // Incorrect Answer - Add Penalty
                penaltyTime += 0.5;
            }
        });
        finalTime = timePlayed + penaltyTime;
        scoresToDOM();
    }
}

/**
 * Adds a small delay (penalty simulation) to the timer mechanism.
 * Not strictly a penalty in logic, but part of the loop timing.
 */
function addTime() {
    timePlayed += 0.1;
    checkTime();
}

/**
 * Starts the interval timer that tracks the player's base time.
 * Updates every 100ms.
 */
function startTimer() {
    // Reset times
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener('click', startTimer);
}

/**
 * Handles the player's selection (Right or Wrong).
 * Scrolls the item container to the next question.
 * @param {boolean} guessedTrue - The player's guess (true for 'Right', false for 'Wrong').
 */
function select(guessedTrue) {
    // Scroll 80 pixels (height of one item)
    valueY += 80;
    itemContainer.scroll(0, valueY);
    // Add player guess to array
    return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}

/**
 * Renders the generated equations into the DOM.
 * Creates 'div' elements for each equation and appends them to the container.
 */
function itemsToDOM() {
    equationsArray.forEach((equation) => {
        // Create Item Div
        const item = document.createElement('div');
        item.classList.add('item');
        // Equation Text
        const equationText = document.createElement('h1');
        equationText.textContent = equation.value;
        // Append
        item.appendChild(equationText);
        itemContainer.appendChild(item);
    });
}

/**
 * Generates correct and incorrect equations based on the selected question amount.
 * Randomly decides equation types and values, ensuring a mix of true and false statements.
 */
function createEquations() {
    // Randomly choose how many correct equations there should be
    const correctEquations = Math.floor(Math.random() * questionAmount);
    // Set amount of wrong equations
    const wrongEquations = questionAmount - correctEquations;

    // Create Correct Equations
    for (let i = 0; i < correctEquations; i++) {
        const firstNumber = Math.floor(Math.random() * 9);
        const secondNumber = Math.floor(Math.random() * 9);
        const equationValue = firstNumber * secondNumber;
        const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationsArray.push({ value: equation, evaluated: 'true' });
    }

    // Create Incorrect Equations
    for (let i = 0; i < wrongEquations; i++) {
        const firstNumber = Math.floor(Math.random() * 9);
        const secondNumber = Math.floor(Math.random() * 9);
        const equationValue = firstNumber * secondNumber;
        let wrongFormat = [];
        wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
        wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
        wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
        const formatChoice = Math.floor(Math.random() * 3);
        const equation = wrongFormat[formatChoice];
        equationsArray.push({ value: equation, evaluated: 'false' });
    }

    // Randomize the order of equations
    shuffle(equationsArray);
}

/**
 * Populates the Game Page.
 * Adds vertical spacing to the container and triggers DOM rendering of equations.
 */
function populateGamePage() {
    // Reset DOM
    itemContainer.textContent = '';
    // Spacer for visual layout
    const topSpacer = document.createElement('div');
    topSpacer.classList.add('height-240');
    // Selected Item Indicator
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item');
    // Append
    itemContainer.append(topSpacer, selectedItem);

    // Create Equations, Randomize, and Add to DOM
    createEquations();
    itemsToDOM();

    // Bottom Spacer
    const bottomSpacer = document.createElement('div');
    bottomSpacer.classList.add('height-500');
    itemContainer.appendChild(bottomSpacer);
}

/**
 * Starts the countdown sequence (3, 2, 1, GO!).
 * Displays the countdown page and transitions to the game page upon completion.
 */
function countdownStart() {
    let count = 3;
    countdown.textContent = count;
    const timeCountDown = setInterval(() => {
        count--;
        if (count === 0) {
            countdown.textContent = 'GO!';
        } else if (count === -1) {
            showGamePage();
            clearInterval(timeCountDown);
        } else {
            countdown.textContent = count;
        }
    }, 1000);
}

/**
 * Transitions from Countdown Page to Game Page.
 * Hides countdown and reveals the active game interface.
 */
function showGamePage() {
    gamePage.hidden = false;
    countdownPage.hidden = true;
}

/**
 * Transitions from Splash Page to Countdown Page.
 * Prepares the game data and starts the visual countdown.
 */
function showCountdown() {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    populateGamePage();
    countdownStart();
}

/**
 * Helper function to retrieve the value of the selected radio button.
 * @returns {string} - The value (number of questions) selected by the user.
 */
function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
        if (radioInput.checked) {
            radioValue = radioInput.value;
        }
    });
    return radioValue;
}

/**
 * Form submission handler to select question amount and start the flow.
 * @param {Event} e - The submission event.
 */
function selectQuestionAmount(e) {
    e.preventDefault();
    questionAmount = getRadioValue();
    if (questionAmount) {
        showCountdown();
    }
}

// --- Event Listeners ---

// Update UI selection on radio button click
startForm.addEventListener('click', () => {
    radioContainers.forEach((radioEl) => {
        // Remove Selected Label Styling
        radioEl.classList.remove('selected-label');
        // Add it back if radio input checked 
        if (radioEl.children[1].checked) {
            radioEl.classList.add('selected-label');
        }
    });
});

// Start Game Flow
startForm.addEventListener('submit', selectQuestionAmount);
// Start Timer on interaction
gamePage.addEventListener('click', startTimer);

// --- Initialization ---
// Load best scores from local storage on application start
getSavedBestScores();