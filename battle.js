const fs = require("fs")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const yargs = require("yargs");
const { parsed, check } = require("yargs");
const inventory = require("./scripts/inventory.js");
const actions = require("./scripts/actions.js");

yargs.command({
    command: "actions",
    describe: "Shows the actions menu.",
    handler: function() {
        helpMenu()
    }
})


yargs.command({
    command: "start",
    aliases: "s",
    describe: "Starts/Restarts the game.",
    handler: function() {
        startFight()
    }
})

yargs.command({
    command: "stats",
    aliases: "show",
    describe: "Displays current stats.",
    handler: function() {
        showStats()
    }
})

yargs.command({
    command: "attack",
    aliases: "a",
    describe: "Attacks the enemy.",
    handler: function() {
        actions.attackEnemy()
    }
})


yargs.command({
    command: "heal",
    aliases: "h",
    describe: "Heals yourself.",
    handler: function() {
        actions.healSelf()
    }
})

yargs.command({
    command: "inventory",
    aliases: "inv",
    describe: "Shows you your inventory",
    handler: function() {
        inventory.showInventory()
    }
})


yargs.command({
    command: "equip",
    aliases: "e",
    builder: {
        name: {
            type: "string",
            demandOption: true,
            describe: "The name of the item."
        }
    },
    describe: "Equips an item from your inventory",
    handler: function(argv) {
        inventory.equip(argv.name)
    }
})

try {
    fs.readFileSync("stats.json")
} catch(e) {
    console.log(chalk.yellow("Creating json file."))
    var stats = {
        enemy: {
            hp: 10,
            ap: 10,
            startingAp: 10,
            isTurn: false,
            weapon: "none"
        },
        player: {
            hp: 10,
            ap: 10,
            startingAp: 10,
            isTurn: true,
            weapon: "none"
        }
    }
    const stringifiedStats = JSON.stringify(stats)
    fs.writeFileSync("stats.json", stringifiedStats)
}

const startFight = function() {
    // console.log(chalk.yellow("Generating stats..."))
    chalkAnimation.karaoke("Generating player stats..")
    setTimeout(() => {
    // Generate random stats
    var enemyHp = Math.floor(Math.random() * (108 - 46)) + 46;
    var playerHp = Math.floor(Math.random() * (102 - 65)) + 65;
    var enemyAp = Math.floor(Math.random() * (13 - 9)) + 9;
    var playerAp = Math.floor(Math.random() * (19 - 7)) + 7;
    // Store stats to stats.json
    var parsedJson = JSON.parse(fs.readFileSync("stats.json"))
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    parsedJson.enemy.hp = enemyHp
    parsedJson.enemy.ap = enemyAp
    parsedJson.player.hp = playerHp
    parsedJson.player.ap = playerAp
    parsedJson.player.startingAp = playerAp
    parsedJson.enemy.startingAp = enemyAp
    parsedJson.player.isTurn = true
    parsedJson.enemy.isTurn = false
    parsedJson.enemy.weapon = "none"
    parsedJson.player.weapon = "none"
    var stringy = JSON.stringify(parsedJson)
    fs.writeFileSync("stats.json", stringy)
    // Show to player their stats
    }, 3000);
    setTimeout(() => {
        var stats = JSON.parse(fs.readFileSync("stats.json"))
        console.log(chalk.magenta.bold("Your stats are: "))
        console.log(chalk.yellow("============="))
        console.log(chalk.green("Health Points: " + stats.player.hp))
        console.log(chalk.green("Attack Power: " + stats.player.ap))
        console.log(chalk.yellow("============="))
        console.log(chalk.magenta.bold("And your starting weapon is: " + stats.player.weapon))
    }, 4000);
    // Show to player enemy stats
    setTimeout(() => {
        var stats = JSON.parse(fs.readFileSync("stats.json"))
        console.log(chalk.cyan("Enemy stats are: "))
        console.log(chalk.yellow("============="))
        console.log(chalk.red("Enemy hp: " + stats.enemy.hp))
        console.log(chalk.red("Enemy ap: " + stats.enemy.ap))
        console.log(chalk.yellow("============="))
        console.log(chalk.cyan.bold("And the enemy's starting weapon is: " + stats.enemy.weapon))
        console.log("You have 6 options to choose.")
    }, 4900);
    // Show to player current options
    setTimeout(() => {
        console.log(chalk.inverse("Type in the command line one of the following:"))
        helpMenu()
    }, 5830);
}

const showStats = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    if(stats.player.weapon === "none") {
        var stats = JSON.parse(fs.readFileSync("stats.json"))
        console.log(chalk.yellow("============="))
        console.log(chalk.red("Enemy hp: " + stats.enemy.hp))
        console.log(chalk.red("Enemy ap: " + stats.enemy.ap))
        console.log(chalk.magenta.bold("Current weapon: " + stats.player.weapon))
        console.log(chalk.yellow("============="))
        console.log(chalk.green("Player hp: " + stats.player.hp))
        console.log(chalk.green("Player ap: " + stats.player.ap))
        console.log(chalk.cyan.bold("Current weapon: " + stats.enemy.weapon))
        console.log(chalk.yellow("============="))
        console.log(chalk.blue("hp = Health Points"))
        console.log(chalk.blue("ap = Attack Points"))
        console.log(chalk.yellow("============="))
    } else {
        var stats = JSON.parse(fs.readFileSync("stats.json"))
        console.log(chalk.yellow("============="))
        console.log(chalk.red("Enemy hp: " + stats.enemy.hp))
        console.log(chalk.red("Enemy ap: " + stats.enemy.ap))
        console.log(chalk.magenta.bold("Current weapon: " + stats.player.weapon))
        console.log(chalk.yellow("============="))
        console.log(chalk.green("Player hp: " + stats.player.hp))
        console.log(chalk.green("Player ap: " + stats.player.ap) + chalk.magenta(" (+ Weapon ap)"))
        console.log(chalk.cyan.bold("Current weapon: " + stats.enemy.weapon))
        console.log(chalk.yellow("============="))
        console.log(chalk.blue("hp = Health Points"))
        console.log(chalk.blue("ap = Attack Points"))
        console.log(chalk.yellow("============="))
    }
    actions.checkHp()
}

const helpMenu = function() {
    console.log("node battle.js actions" + chalk.magenta(" = This action shows you THIS if you forget."))
    console.log("node battle.js attack" + chalk.red(" = This action has a 75% chance to attack the enemy for your current ap. If it fails, no damage is dealt and your turn is wasted."))
    console.log("node battle.js heal" + chalk.green(" = This action has a 50% percent chance to heal you for two TIMES the value of the enemies ap. If it fails, you stay at your current hp and your turn is wasted."))
    console.log("node battle.js stats" + chalk.blue(" = This action shows your and the enemy stats."))
    console.log("node battle.js equip --name=item_name" + chalk.yellow(" = This action changes your current weapon to buff your ap, after changing to a different weapon it will be you enemy's turn. (Replace item_name with the actual item name to equip the weapon.)"))
    console.log("node battle.js inventory" + chalk.yellowBright(" = Shows you your inventory, usefull for getting the name of a item to equip."))
    console.log(chalk.grey("Commands are CASE sensitive."))
}

yargs.parse()