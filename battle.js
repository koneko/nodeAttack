const fs = require("fs")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const yargs = require("yargs");
const { parsed, check } = require("yargs");

yargs.command({
    command: "start",
    aliases: "restart",
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
    describe: "Attacks the enemy.",
    handler: function() {
        attackEnemy()
    }
})


yargs.command({
    command: "heal",
    describe: "Heals yourself.",
    handler: function() {
        healSelf()
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
            isTurn: false
        },
        player: {
            hp: 10,
            ap: 10,
            isTurn: true
        }
    }
    const stringifiedStats = JSON.stringify(stats)
    fs.writeFileSync("stats.json", stringifiedStats)
}


const setEnemyTurn = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    stats.player.isTurn = false
    stats.enemy.isTurn = true
    var statsS = JSON.stringify(stats)
    fs.writeFileSync("stats.json", statsS)
    checkHp()
}

const setPlayerTurn = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    stats.player.isTurn = true
    stats.enemy.isTurn = false
    var statsS = JSON.stringify(stats)
    fs.writeFileSync("stats.json", statsS)
    checkHp()
}

const attackEnemy = function() {
    checkHp()
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    if(stats.player.isTurn === true) {
        var hitChance = Math.floor((Math.random() * 3) + 1);
        if (hitChance === 1 || 2) {
            var newEnemyHp = stats.enemy.hp - stats.player.ap
            console.log(chalk.yellow("Your attack hit the enemy!") + chalk.green("\nThe enemy lost " + chalk.cyan(stats.player.ap) + " health points." + "\nThe enemy now has " + chalk.red(newEnemyHp)) + chalk.green(" health points."))
            console.log("Its now the enemy's turn.")
            stats.enemy.hp = newEnemyHp
            var stringy = JSON.stringify(stats)
            fs.writeFileSync("stats.json", stringy)
        } else {
            console.log(chalk.red("You have missed! Your turn is wasted and the enemy remains at " + chalk.cyan(stats.enemy.hp) + " hp."))
        }
        setEnemyTurn()
    } else {
        console.log(chalk.red.inverse("It is not your turn"))
    }
    setTimeout(() => {
        enemyTurnAI()
    }, 2000);
}

const healSelf = function() {
    checkHp()
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    var healChance = Math.floor((Math.random() * 2) + 1);
    if(healChance === 1) {
        var ammountToHeal = stats.enemy.ap + stats.enemy.ap
        stats.player.hp = stats.player.hp + ammountToHeal
        var stringy = JSON.stringify(stats)
        fs.writeFileSync("stats.json", stringy)
        console.log(chalk.green("Success! You have healed yourself for " + chalk.magenta(ammountToHeal) + " health points. After the heal you now have " + chalk.cyan(stats.player.hp) + " health points."))
    } else {
        console.log(chalk.red("Your spell has failed. You have wasted your turn and your health stays the same."))
    }
    setTimeout(() => {
        enemyTurnAI()
    }, 2000);
}

const enemyTurnAI = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    if(stats.enemy.hp <= 0) {
        checkHp()
    } else {
        console.log(chalk.magentaBright("Enemy turn: "))
        var attackChance = Math.floor((Math.random() * 5) + 1);
        if(attackChance === 1) {
            //heal
            var healChance = Math.floor((Math.random() * 4) + 1);
            if(healChance === 1) {
                var ammountToHeal = stats.player.ap + stats.player.ap
                stats.enemy.hp = stats.enemy.hp + ammountToHeal
                var stringy = JSON.stringify(stats)
                fs.writeFileSync("stats.json", stringy)
                console.log(chalk.red("Success! The enemy has healed itself for " + chalk.magenta(ammountToHeal) + " health points. After the heal it now has " + chalk.cyan(stats.enemy.hp) + " health points."))
                console.log("Its your turn now!")
            } else {
                console.log(chalk.green("They tried to heal but their spell has failed. They have wasted their turn and their health stays the same."))
                console.log("Its your turn now!")
            }
        } else {
            //attack
            var hitChance = Math.floor((Math.random() * 3) + 1);
            if(hitChance === 2 || 3) {
                var newPlayerHp = stats.player.hp - stats.enemy.ap
                stats.player.hp = newPlayerHp
                var stringy = JSON.stringify(stats)
                fs.writeFileSync("stats.json", stringy)
                console.log(chalk.red("The enemy attack was a success.\nThey took " + chalk.cyan(stats.enemy.ap) + " health points.\nYou now have " + chalk.green(stats.player.hp) + chalk.red(" health points.")))
                console.log("Its your turn now!")
            } else {
                console.log(chalk.green("They tried to attack but their attack was not successfull, you retain your health points."))
                console.log("Its your turn now!")
            }
        }
        setPlayerTurn()
    }
 
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
    parsedJson.player.isTurn = true
    parsedJson.enemy.isTurn = false
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
    }, 4000);
    // Show to player enemy stats
    setTimeout(() => {
        var stats = JSON.parse(fs.readFileSync("stats.json"))
        console.log(chalk.cyan("Enemy stats are: "))
        console.log(chalk.yellow("============="))
        console.log(chalk.red("Enemy hp: " + stats.enemy.hp))
        console.log(chalk.red("Enemy ap: " + stats.enemy.ap))
        console.log(chalk.yellow("============="))
        console.log("You have 3 options to choose.")
    }, 4900);
    // Show to player current options
    setTimeout(() => {
        console.log(chalk.inverse("Type in the command line one of the following:"))
        console.log("node battle.js attack" + chalk.yellow(" = This action has a 75% chance to attack the enemy for your current ap. If it fails, no damage is dealt and your turn is wasted."))
        console.log("node battle.js heal" + chalk.green(" = This action has a 50% percent chance to heal you for two TIMES the value of the enemies ap. If it fails, you stay at your current hp and your turn is wasted."))
        console.log("node battle.js stats" + chalk.cyan(" = This action shows your and the enemy stats."))
    }, 5830);
}

const showStats = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    console.log(chalk.yellow("============="))
    console.log(chalk.red("Enemy hp: " + stats.enemy.hp))
    console.log(chalk.red("Enemy ap: " + stats.enemy.ap))
    console.log(chalk.yellow("============="))
    console.log(chalk.green("Player hp: " + stats.player.hp))
    console.log(chalk.green("Player ap: " + stats.player.ap))
    console.log(chalk.yellow("============="))
    console.log(chalk.blue("hp = Health Points"))
    console.log(chalk.blue("ap = Attack Points"))
    console.log(chalk.yellow("============="))
    checkHp()
}

const checkHp = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    if(stats.player.hp <= 0) {
        console.log(chalk.red("Sorry dear player but you have lost to the enemy.\nEnemy stats: \nHp: " + stats.enemy.hp + "\nAp: " + stats.enemy.ap))
    }
    if(stats.enemy.hp <= 0) {
        console.log(chalk.green("Congratulations player, you have won! Here are your final stats for the game.\nHp: " + chalk.yellow(stats.player.hp) + chalk.green("\nAp: ") + chalk.yellow(stats.player.ap)))
    }
}

yargs.parse()