import { stdin as input, stdout as output } from "process";
import { createInterface as create } from "readline";
import { log as print } from "console";

// import your GuessTheNumber

const prompt = create({
	input,
	output
});

function askName() {
	prompt.question("What is your name? ", name => {
		if (name) {
			print(`Your name is ${ name }`);
			prompt.close();
		} else {
			askName();
		}
	});
}

askName();
