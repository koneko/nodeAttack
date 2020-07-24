const fs = require("fs")
const chalk = require("chalk")

const attackEnemy = function() {
        api.loadGame()
        checkHp()
        var hitChance = Math.floor((Math.random() * 3) + 1);
        if (hitChance === 1 || 2) {
            var newEnemyHp = data.enemy.health - data.player.strength
            // var stringy = JSON.stringify(stats)
            // fs.writeFileSync("stats.json", stringy)
            console.log(chalk.green("Hit!"))
            console.log(chalk.green(`You dealt ${data.player.strength} damage to the enemy.`))
            console.log(chalk.green(`The enemy now has ${newEnemyHp}`))
            data.enemy.health = newEnemyHp
        } else {
            console.log(chalk.red("You failed. The enemy still has " + chalk.cyan(data.enemy.health) + " hp."))
        }
    // setTimeout(() => {
    //     enemyTurnAI()
    // }, 2000);
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
    api.loadGame()
    if(data.enemy.health) {

    } else
    if(data.player.health) {

    }

}

module.exports = {
    checkHp: checkHp,
    enemyTurnAI: enemyTurnAI,
    attackEnemy: attackEnemy,
    healSelf: healSelf
}