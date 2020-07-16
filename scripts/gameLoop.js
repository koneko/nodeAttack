const chalk = require("chalk");
const fs = require("fs");
const shop = require("./shop.js");
const { warpShop } = require("./shop.js");

const createGame = function () {
    //Todo: check if save.json already exists, and list stats.
    var templateUnparsed = fs.readFileSync("data/saveTemplate.json");
    var template = JSON.parse(templateUnparsed);
    fs.writeFileSync("data/save.json", templateUnparsed);
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
    console.log(chalk.green('Welcome to nodeAttack!'));
    console.log(chalk.yellow('Main menu:'));
    console.log(chalk.cyan("new  - New game"));
    console.log(chalk.blue("load - Load saved game"));
    console.log(chalk.red("exit - Exit game"));
    console.log("");


    readline.question("Please enter a command: ", (command) => {
        //console.log(`You have entered ${command}.`);
        if(command == "new") {
            readline.question("Are you sure you want to begin a new game? (y/n) ", (answer) => {
                if(answer === "y") {
                    console.log(chalk.green("Alright, starting a new game for you."));
                    var data = createGame()
                    gameLoop(data, readline)        
                } else if (answer === "n") {
                    console.log("Good, your save wasn't over written. Bringing you back to the main menu.")
                    displayMainMenu(readline);
                } else {
                    console.log("Your response is not valid.")
                    console.log("Please provide a valid response.")
                    displayMainMenu(readline);
                }
            })

        } else if(command == "load") {
            console.log(chalk.cyan(`Your save has been loaded.`));   
            var data = loadGame()
            gameLoop(data, readline)
    
        } else if(command == "exit") {
            console.log(chalk.yellow(`Goodbye, dear player.`));   
            process.exit(0);
    
        } else { 
            console.log(chalk.red(`Command "${command}" is not a valid command!`));   
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

    readline.question("Please enter a command: ", (command) => {
        //console.log(`You have entered ${command}.`);
        switch (command) {
            case "stats":
                console.log(chalk.grey("=========="))
                console.log(chalk.magenta("Displaying your stats: "));
                console.log(chalk.green(`Level: ${data.player.level}`))
                console.log(chalk.yellow(`Gold: ${data.player.gold}`))
                console.log(chalk.red(`Health points: ${data.player.health}`))
                console.log(chalk.blue(`Strength points: ${data.player.strength}`))
                console.log(chalk.grey("=========="))
                console.log(chalk.cyan(`You have ${data.player.currentxp}/${data.player.xpforlevelup} experience points required to level up to the next level.`))
                gameLoop(data, readline);
                //Stats done
                break;

            case "shop":
                console.log("Shopkeeper: Welcome to my shop.")
                warpShop(data, readline)
                break;

            case "fight":
                console.log(chalk.red("Alright, generating you an opponent."));
                //adapt normal code with this,
                break;

            case "save":
                console.log(chalk.green("Your stats have been saved!"));
                saveGame(data)
                gameLoop(data, readline)
                //saving is done(handled by save and load functions)
                break;

            case "back":
                console.log(chalk.green("Sending you to the main menu."));
                displayMainMenu(readline);
                //sends to mainmenu
                break;

            default:
                console.log(chalk.red(`Command "${command}" is not a valid command!`));
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
