function startGame() {
  document.getElementById("game-fieldset").style.display = "block";
  document.getElementById("start-game").style.display = "none";
  exitButton = document.createElement("button");
  exitButton.innerText = "Exit Game";
  exitButton.id = "exit-game";
  exitButton.style.marginTop = "10px";
  document.body.insertBefore(exitButton, document.getElementById("start-game"));
  exitButton.addEventListener("click", exitGame);


  randomNumber = Math.floor(Math.random() * 10) + 1;
  console.log("Random Number (for testing): " + randomNumber);

}


function exitGame() {
  document.getElementById("game-fieldset").style.display = "none";
  document.getElementById("start-game").style.display = "block";
  document.getElementById("exit-game").remove();
  document.getElementById("result").style.display = "none";
  document.getElementById("guess").value = "";
  document.getElementById("check-number").disabled = true;
  previousGuesses = [];
  guessAmount = 0;
}


document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("guess").addEventListener("input", function() {
  document.getElementById("check-number").disabled = false;
});

document.getElementById("check-number").addEventListener("click", guessedNumber);

previousGuesses = [];
guessAmount = 0;

function guessedNumber() {
  const userGuess = parseInt(document.getElementById("guess").value);
  const resultDisplay = document.getElementById("result");

  resultDisplay.style.display = "block";
  guessAmount += 1;

  if (guessAmount > 3) {
    resultDisplay.innerText = "Game Over! You've used all your guesses. The correct number was " + randomNumber + ".";
    document.getElementById("check-number").disabled = true;
    return;
  }

  if (userGuess != randomNumber) {
      previousGuesses.push(userGuess);
  }

  if (userGuess === randomNumber) {
    resultDisplay.innerText = "Congratulations! You guessed the correct number.";
  }
  else if (userGuess < randomNumber) {
    resultDisplay.innerText = "Too low! Try again. Guess #" + guessAmount + ": These are your previous guesses: " + previousGuesses.join(", ");
  }
  else if (userGuess > randomNumber) {
    resultDisplay.innerText = "Too high! Try again. Guess #" + guessAmount + ": These are your previous guesses: " + previousGuesses.join(", ");
  }
  else {
    resultDisplay.innerText = "Please enter a valid number.";
  }
}


