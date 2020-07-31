const chalk = require("chalk");
const fs = require("fs");
const rn = require("random-number")

const createGame = function () {
    //Todo: check if save.json already exists, and list stats.
    var templateUnparsed = fs.readFileSync("data/templates/saveTemplate.json");
    var templateUnparsedInv = fs.readFileSync("data/templates/playerInventoryTemplate.json");
    fs.writeFileSync("data/save.json", templateUnparsed);
    fs.writeFileSync("data/inventory.json", templateUnparsedInv);
    loadGame();
};

const loadGame = function () {
    var dataUnparsed = fs.readFileSync("data/save.json");
    var dataUnparsedInv = fs.readFileSync("data/inventory.json");
    api.data = JSON.parse(dataUnparsed);
    api.playerInv = JSON.parse(dataUnparsedInv)
};

const saveGame = function () {
    fs.writeFileSync("data/save.json", JSON.stringify(api.data));
};



const displayMainMenu = function() {
    console.log(chalk.green('Welcome to nodeAttack!'));
    console.log(chalk.yellow('Main menu:'));
    console.log(chalk.cyan("new  - New game"));
    console.log(chalk.blue("load - Load saved game"));
    console.log(chalk.red("exit - Exit game"));
    console.log("");

    api.readline.question("Please enter a command: ", (command) => {
        //console.log(`You have entered ${command}.`);
        if(command == "new") {
            api.readline.question("Are you sure you want to begin a new game? (y/n) ", (answer) => {
                if(answer === "y") {
                    console.log(chalk.green("Alright, starting a new game for you."));
                    api.createGame()
                    api.gameLoop()
                } else if (answer === "n") {
                    console.log("Good, your save wasn't over written. Bringing you back to the main menu.")
                    api.displayMainMenu();
                } else {
                    console.log("Your response is not valid.")
                    console.log("Please provide a valid response.")
                    api.displayMainMenu();
                }
            })

        } else if(command == "load") {
            console.log(chalk.cyan(`Your save has been loaded.`));   
            api.loadGame()
            api.gameLoop()
    
        } else if(command == "exit") {
            console.log(chalk.yellow(`Goodbye, dear player.`));   
            process.exit(0);
    
        } else { 
            console.log(chalk.red(`Command "${command}" is not a valid command!`));   
            console.log("");
            api.displayMainMenu();     
        }
    
    });    
}

const gameLoop = function () {

    console.log(chalk.grey("----Menu navigation----"))
    console.log(chalk.red("fight  - Fight next NPC"));
    console.log(chalk.blue("shop   - Enter shop and buy/sell"));
    console.log(chalk.green("back   - Back to main menu"));
    console.log(chalk.grey("----Character Stats----"))
    console.log(chalk.red("stats  - Displays your character stats"));
    console.log(chalk.blue("inv   - Displays your inventory"))
    console.log(chalk.green("save   - Saves the game"));
    console.log(chalk.cyan("reload - Check stats for change"));
    console.log("");

    api.readline.question("Please enter a command: ", (command) => {
        //console.log(`You have entered ${command}.`);
        switch (command) {
            case "stats":
                console.log(chalk.grey("=========="))
                console.log("Displaying your stats: ");
                console.log(chalk.green(`Level: ${api.data.player.level}`))
                console.log(chalk.yellow(`Gold: ${api.data.player.gold}`))
                console.log(chalk.red(`Health points: ${api.data.player.health}`))
                console.log(chalk.blue(`Strength points: ${api.data.player.strength}`))
                console.log(chalk.magenta(`Current weapon: ${api.data.player.heldWeapon}`))
                console.log(chalk.grey("=========="))
                console.log(chalk.cyan(`You have ${api.data.player.currentxp}/${api.data.player.xpforlevelup} experience points required to level up to the next level.`))
                api.gameLoop();
                //Stats done
                break;

            case "shop":
                console.log("Shopkeeper: Welcome to my shop.")
                api.warpShop()
                break;

            case "fight":
                console.log(chalk.cyanBright("You have entered a fight."))
                battleLoop()
                // console.log(api.data)
                break;

            case "save":
                console.log(chalk.green("Your stats have been saved!"));
                api.saveGame()
                api.gameLoop()
                //saving is done(handled by save and load functions)
                break;

            case "reload":
                    console.log(chalk.blue("Stats reloaded!"));
                    api.loadGame()
                    api.gameLoop()
                    //saving is done(handled by save and load functions)
                break;

            case "back":
                console.log(chalk.green("Sending you to the main menu."));
                api.displayMainMenu();
                //sends to mainmenu
                break;

            case "inv":
                showInventory()
                break;

            default:
                console.log(chalk.red(`Command "${command}" is not a valid command!`));
                console.log("");
                api.gameLoop();
                break;
        }
    });
};



const inventoryLoop = function() {
    console.log("Please make a choice: ")
    console.log("inventory - Displays you your inventory")
    console.log("equip     - Lets you equip and item from your inventory")
    console.log("back      - Back to the main menu")
    api.readline.question("Please enter a command: ", (command) => {
        if(command === "inventory") {

        } else if (command === "equip") {

        } else if (command === "back") {

        } else {

        }
    })
}


const showInventory = function() {
    api.playerInv = JSON.parse(fs.readFileSync("data/inventory.json"))
    console.log(chalk.grey("--------------------"))
    console.log(chalk.cyan(`In your inventory you have ${api.playerInv.length} item(s) in your inventory.`))
    console.log("Here are their stats individualy.")
    console.log(chalk.grey("--------------------"))
    api.playerInv.forEach(item => {
        console.log(chalk.blue(`Type: ${item.type}`))
        console.log(chalk.red(`Name: ${item.name}`))
        console.log(chalk.green(`Description: ${item.description}`))
        console.log(chalk.cyan(`Required level: ${item.level}`))
        console.log(chalk.yellow(`Value: ${item.value}`))
        console.log(chalk.magenta(`Strength: ${item.strength}`))
        console.log(chalk.grey("--------------------"))
    });
    gameLoop()
}

const equipItem = function() {

}

const attackEnemy = function() {
    
    var genP = rn.generator({
        min: 1,
        max: 2,
        integer: true
    })
    var hitchance = genP()
    if(hitchance === 1) {
        api.loadGame()
        //attack hits
        data.playerInv.find((item) => {
            console.log(item)
            // if(data.player.heldWeapon === item.name) {
            //     console.log(ite)
            // }
        })
        // var strengthWweapon = data.player.strength + 
        // var newenemyhp = data.enemy.health -
    } else {
        //attack fails
    }
}

const healSelf = function() {

}

const enemyAi = function() {
    var gen = rn.generator({
        min: 1,
        max: 4,
        integer: true
    })
    var chance = gen()
    if(chance === 1 || 2) {
        //attack
    } else {
        //heal
    }

}

const checkHp = function() {
    
}

const generateEnemy = function() {
    var genEstrength = rn.generator({
        min: 3,
        max: 6,
        integer: true
    })
    var genEhealth = rn.generator({
        min: 17,
        max: 28,
        integer: true
    })
    var eStrength = genEstrength()
    var eHealth = genEhealth()
    data.enemy.health = eHealth
    data.enemy.strength = eStrength
    saveGame()
    console.log(chalk.green("Enemy stats successfully generated!"))
}

const showStatsInGame = function() {
    console.log(chalk.green(`Your health: ${data.player.health}`))
    console.log(chalk.green(`Your strength: ${data.player.strength}`))
    console.log(chalk.green(`Your weapon: ${data.player.heldWeapon}`))
    console.log(chalk.gray("------------------"))
    console.log(chalk.yellow(`Enemy health: ${data.enemy.health}`))
    console.log(chalk.yellow(`Enemy strength: ${data.enemy.strength}`))
}

const battleLoop = function() {
    api.readline.question("Make a choice: ", (choice) => {
        if(choice === "fight") {
            attackEnemy()
        } else if(choice === "heal") {
            healSelf()
        } else if (choice === "stats") {
            // showStatsInGame()
            generateEnemy()
        }
    })
}


module.exports = {
    checkHp: checkHp,
    enemyAi: enemyAi,
    attackEnemy: attackEnemy,
    healSelf: healSelf,
    createGame,
    gameLoop,
    loadGame,
    saveGame,
    displayMainMenu,
    inventoryLoop
};
