'use strict';

// selecting elements
const player0el = document.querySelector(".player--0");
const player1el = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// starting conditions
let scores, currentScore, activePlayer, playing
// this variable will be outside the roll funcn bcoz every time we roll this will reset to 0 and we cant restore it then(current player)

const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEl.classList.add("hidden");
	player0el.classList.remove("player--winner");
	player1el.classList.remove("player--winner");
	player0el.classList.add("player--active");
	player1el.classList.remove("player--active");
}

init();

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0el.classList.toggle("player--active");
	player1el.classList.toggle("player--active");

}


// Rolling Dice functionality
btnRoll.addEventListener("click", function () {

	if (playing) {
		// 1. Generating random dice roll.
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. Display Dice.
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;

		// 3. check for rolled 1
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;

			// current0El.textContent = currentScore; // chnge later

		} else {
			// switch to next player.
			switchPlayer();
			// its alternate code is that whole function 

		}
	}

});

btnHold.addEventListener("click", function () {

	if (playing) {
		// 1. Add current score to total score 
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		// 2. Check if the player's score is >= 100
		if (scores[activePlayer] >= 100) {
			// finish the game
			playing = false;

			document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");

			document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

			diceEl.classList.add("hidden");

		} else {
			// if not then switch the player
			switchPlayer();
		}
	}

});

btnNew.addEventListener("click", init);