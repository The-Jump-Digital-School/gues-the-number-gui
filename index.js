import { stdin as input, stdout as output, exit, argv } from "process";
import { createInterface } from "readline";
import { log as print } from "console";

import GuessTheNumber from "./src/GuessTheNumber.js";

const DIFFICULTY = {
	"easy": {
		tries:10,
		upper: 25,
	},
	"medium": {
		tries: 7,
		upper: 50
	},
	"hard": {
		tries: 5,
		upper: 100,
	}
}

const prompt = createInterface({
	input,
	output
});

let game;
let [ difficulty = "easy" ] = argv.slice(2);

function initGame() {
	game = new GuessTheNumber(DIFFICULTY[difficulty]);

	playGame(
`
****************************************
GUESS THE NUMBER GAME

Guess a number between ${ game.lower } and ${ game.upper }.
You have ${ game.attemptsRemaining } attempts.

CHEAT MODE ON -- ANSWER: ${ game.target }
****************************************
`
	);
}

function playGame(message) {
	print(message);

	prompt.question("Make a guess: ", guess => {
		guess = guess.toLowerCase();

		if (guess === "help")
			return help();
		
		if (guess === "exit")
			return exit();

		guess = parseInt(guess);

		if (isNaN(guess))
			return playGame("You need to guess a number!");

		const state = game.guess(guess);

		print(`ATTEMPTS LEFT: ${ game.attemptsRemaining }`);
	
		const {
			TOO_HIGH,
			TOO_LOW,
			EXACT_MATCH,
			OUT_OF_BOUNDS,
			GAME_OVER
		} = GuessTheNumber;
	
		if (state === TOO_HIGH)
			playGame("Too high, guy.");
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
	});
}

function help() {
	const distance = game.help();
	playGame(distance === 0 ?
		`You need to make a valid guess first, bozo.` :
		`Your last guess was within ${ distance } of the right answer.`);
}


initGame();
