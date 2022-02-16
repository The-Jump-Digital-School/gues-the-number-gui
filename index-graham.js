import { stdin as input, stdout as output, exit } from "process";
import { createInterface } from "readline";
import { log as print } from "console";

import GuessTheNumber from "./GuessTheNumber.js";

const prompt = createInterface({
	input,
	output
});

let game;

function initGame() {
	game = new GuessTheNumber();
	playGame(`
****************************************
 GUESS THE NUMBER GAME
****************************************
	
 Guess a number between ${ game.lower } and ${ game.upper }...
	`);
}

function playGame(message) {
	print(message);

	prompt.question("Make a guess: ", guess => {
		if (guess === "help")
			return playGame(help());
		if (guess === "restart")
			return initGame();
		if (guess === "exit")
			return exit();

		const state = game.guess(parseInt(guess));

		const {
			TOO_HIGH,
			TOO_LOW,
			EXACT_MATCH,
			OUT_OF_BOUNDS,
			GAME_OVER
		} = GuessTheNumber;

		if (state === TOO_HIGH)
			playGame("Too high, guy!");
		else if (state === TOO_LOW)
			playGame("Too low, bro.");
		else if (state === OUT_OF_BOUNDS)
			playGame(`You need to guess a number between ${ game.lower } and ${ game.upper }`);
		else {
			if (state === EXACT_MATCH)
				print("You won, son!!! Nicely done.");
			else if (state === GAME_OVER)
				print(`You have no tries left -- sad for you :(`);
			
			initGame();
		}
	})
}

function help() {
	const distance = game.help();

	return distance === 0 ?
			`You need to make a valid guess first, bozo.` :
			`Your last guess was within ${ distance } of the right answer.`;
}

initGame();
