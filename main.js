import GuessTheNumber from "./GuessTheNumber.js";

const CLICK = "click";

function getElements(...ids) {
	return Object.fromEntries(
		ids.map(
			id =>
			[
				id,
				document.getElementById(id)
			]
		)
	);
}

const elements = getElements(
	"lowerBound",
	"upperBound",
	"guessesLeft",
	"guessInput",
	"guessButton",
	"helpButton",
	"closeButton",
);

let game;

function initGame(settings = {}) {
	game = new GuessTheNumber({
		lower: 1,
		upper: 100,
		tries: 10,
	});

	elements.lowerBound.innerHTML = game.lower;
	elements.upperBound.textContent = game.upper;

	elements.guessesLeft.innerHTML = game.attemptsRemaining;
}


elements.helpButton.addEventListener(
	CLICK,
	event => {
		event.preventDefault();

		const distance = game.help();

		alert(
			distance === 0 ?
				`You need to make a valid guess first, bozo.` :
				`Your last guess was within ${ distance } of the right answer.`
		);
	}
);

elements.guessButton.addEventListener(CLICK, event => {
	event.preventDefault();

	const {
		guessInput,
		guessesLeft
	} = elements;

	const state = game.guess(parseInt(guessInput.value));

	const {
		TOO_HIGH,
		TOO_LOW,
		EXACT_MATCH,
		OUT_OF_BOUNDS,
		GAME_OVER
	} = GuessTheNumber;

	guessesLeft.innerHTML = game.attemptsRemaining;

	if (state === TOO_HIGH)
		alert("Too high, guy.");
	else if (state === TOO_LOW)
		alert("Too low, bro.");
	else if (state === OUT_OF_BOUNDS)
		alert(`You need to guess a number between ${ game.lower } and ${ game.upper }`);
	else {
		if (state === EXACT_MATCH)
			alert("You won, son!!! Nicely done.");
		else if (state === GAME_OVER)
			alert(`You have no tries left -- sad for you :(`);
		initGame();
	}
	

	guessInput.value = '';
});

initGame();
