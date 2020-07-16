const game = require("./scripts/gameLoop.js")
const chalk = require("chalk");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});


game.displayMainMenu(readline);
//readline.close();


//Hello

// Hello, back