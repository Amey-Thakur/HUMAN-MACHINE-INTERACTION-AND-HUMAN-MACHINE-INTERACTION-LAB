/*
    Experiment 2: Mathematical Application for Kids (Math Sprint Game)
    Author: Amey Thakur
    Batch: B3
    Roll No: 50
    Subject: Human Machine Interaction (CSL801)
    Date: 26/12/2025

    This script implements the Fisher-Yates (aka Knuth) Shuffle algorithm.
    It is used to randomize the order of equations in the game arrays.
    
    Functionality:
    - Accepts an array as input.
    - Iterates through the array elements in reverse order.
    - Swaps each element with a randomly selected element that comes before it (or itself).
    - Returns the mutated, randomized array.
*/

/**
 * Randomizes the order of elements in an array using the Fisher-Yates Shuffle algorithm.
 * @param {Array} array - The array to be shuffled.
 * @returns {Array} - The shuffled array.
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}