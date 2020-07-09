const fs = require("fs")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const yargs = require("yargs");
const { parsed, check } = require("yargs");
const inventory = require("./inventory.js");

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

const checkHp = function() {
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    if(stats.player.hp <= 0) {
        console.log(chalk.red("Sorry dear player but you have lost to the enemy.\nEnemy stats: \nHp: " + stats.enemy.hp + "\nAp: " + stats.enemy.ap))
    }
    if(stats.enemy.hp <= 0) {
        console.log(chalk.green("Congratulations player, you have won! Here are your final stats for the game.\nHp: " + chalk.yellow(stats.player.hp) + chalk.green("\nAp: ") + chalk.yellow(stats.player.ap)))
    }
}

module.exports = {
    checkHp: checkHp,
    setEnemyTurn: setEnemyTurn,
    setPlayerTurn: setPlayerTurn,
    enemyTurnAI: enemyTurnAI,
    attackEnemy: attackEnemy,
    healSelf: healSelf
}