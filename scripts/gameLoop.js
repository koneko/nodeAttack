const chalk = require("chalk");
const fs = require("fs");

const createGame = function () {
    //Todo: check if save.json already exists, and list stats.
    var templateUnparsed = fs.readFileSync("data/saveTemplate.json");
    var template = JSON.parse(templateUnparsed);
    fs.writeFileSync("data/save.json", templateUnparsed);
    console.log("gold: " + template.player.gold);
    return template;
};

const loadGame = function () {
    var dataUnparsed = fs.readFileSync("data/save.json");
    var data = JSON.parse(dataUnparsed);
    return data;
};

const saveGame = function (data) {
    fs.writeFileSync("data/save.json", JSON.stringify(data));
};



const displayMainMenu = function(readline) {
    console.log('Welcome to "nodeAttack"!');
    console.log('Main menu:');
    console.log("new  - New game");
    console.log("load - Load saved game");
    console.log("exit - Exit game");
    console.log("");


    readline.question("Please enter your choice: ", (command) => {
        //console.log(`You have entered ${command}.`);
        if(command == "new") {
            console.log(chalk.green("Alright, starting a new game for you."));
            var data = createGame()
            gameLoop(data, readline)

        } else if(command == "load") {
            console.log(chalk.inverse(`You have chosen to load your previous save`));   
            var data = loadGame()
            gameLoop(data, readline)
    
        } else if(command == "exit") {
            console.log(chalk.inverse(`Sorry that you are leaving :(`));   
            process.exit(0);
    
        } else { 
            console.log(chalk.red(`Command ${command} is not a valid command!`));   
            console.log("");
            displayMainMenu(readline);     
        }
    
    });    
}

const gameLoop = function (data, readline) {
    console.log("");
    console.log("Make a choice:");
    console.log("stats  - Your character stats");
    console.log("shop   - Enter shop and buy/sell");
    console.log("fight  - Fight next NPC");
    console.log("save   - Save game");
    console.log("back   - Back to main menu");
    console.log("");

    readline.question("Please enter command: ", (command) => {
        //console.log(`You have entered ${command}.`);
        switch (command) {
            case "stats":
                console.log(chalk.magenta("Displaying your stats: "));
                gameLoop(data, readline);
                break;

            case "shop":
                console.log(chalk.yellow("Sending you to the shop."));
                break;

            case "fight":
                console.log(chalk.red("Alright, generating you an opponent."));
                break;

            case "save":
                console.log(chalk.green("Saving your "));
                break;

            case "back":
                console.log(chalk.green("Sending you to the main menu."));
                displayMainMenu(readline);
                break;

            default:
                console.log(chalk.red(`Command ${command} is not a valid command!`));
                console.log("");
                gameLoop(data, readline);
                break;
        }
    });
};

module.exports = {
    createGame,
    gameLoop,
    loadGame,
    saveGame,
    displayMainMenu
};
