let guessesDefault = 3;
let continueGame = true;

while (continueGame) {

  let randomNumber = Math.floor(Math.random() * 10) + 1;

  playNumberGame(randomNumber)
  
  continueGame = confirm("Do you want to continue playing?")
  
  if (continueGame == false) {
    alert("Thank you for playing!")
  }

}

function playNumberGame(secretNumber) {

  const guesses = [];

  for(let guessesLeft = guessesDefault; guessesLeft > 0; guessesLeft--) {
    guess = getUserInput()
    guesses.push(guess)

    if (guess == secretNumber) {
      alert("You were right with " + guess + ". You needed " + guesses.length + " to guess it.")
      return true;
    } else if (guess > secretNumber) {
      alert("Your guess was too large. And you have used " + guesses.length + " of your guesses. Your guesses were: " + guesses)
    } else if (guess < secretNumber) {
      alert("Your guess was too small. And you have used " + guesses.length + " of your guesses. Your guesses were: " + guesses)
    }
  }

  alert("You did not get it, the right number was " + secretNumber)
  return false;

}

function getUserInput() {

  guess = prompt("Input your number")
  valid = false;

  while (!valid) {
    try {
      if (isNaN(guess)) {
        throw new Error("Not a number!"); 
      }
      guess = Number(guess)

      if (guess < 0 || guess > 10) {
        throw new Error("Number out of range!"); 
      }

      valid = true;

    } catch (error) {
      guess = prompt(error.message + " Please input a number between 1 and 10.")
    }
  }

  return guess;

}