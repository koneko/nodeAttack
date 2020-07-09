const fs = require("fs")
const chalk = require("chalk")
const chalkAnimation = require("chalk-animation")
const yargs = require("yargs");
const { parsed, check } = require("yargs");
const actions = require("./actions.js");

const equip = function(name) {
    var items = JSON.parse(fs.readFileSync("items.json"))
    var stats = JSON.parse(fs.readFileSync("stats.json"))
        try {
            let item = items.find(x => x.name == name);
            if(item.name != stats.player.weapon) {
                if(item.name === "none") {
                    stats.player.ap = stats.player.startingAp
                    stats.player.weapon = item.name
                    fs.writeFileSync("stats.json", JSON.stringify(stats))
                    console.log(chalk.green("You have successfully unequiped your weapon making your ap " + chalk.cyan(stats.player.ap)))
                } else {
                    var newplayerAp = stats.player.startingAp + item.ap
                    console.log(chalk.green("Success! You have equiped the item with the name ") + chalk.cyan(item.name + ".") + chalk.green(" The item is a ") + chalk.blue(item.type + ".") + chalk.green(" Because you equiped the item, your " + chalk.cyan(stats.player.ap) + chalk.green(" ap was set to ") + chalk.cyan(newplayerAp) + chalk.green(" ap.")))
                    stats.player.ap = newplayerAp
                    stats.player.weapon = item.name
                    fs.writeFileSync("stats.json", JSON.stringify(stats))
                }
                setTimeout(() => {
                    actions.enemyTurnAI()
                }, 1900);
                // stats.player.ap = newplayerAp
                // stats.player.weapon = item.name
                // fs.writeFileSync("stats.json", JSON.stringify(stats))
            } else {
                console.log(chalk.magenta("You already have that weapon equiped."))
            }
        } catch (e) {
            // console.log(e)
            console.log(chalk.red("The item name that you entered does not exist. The name of the weapon is CASE sensitive. Please use the command *node battle.js inventory* to see the list of items in your inventory."))
        }
    }

const showInventory = function() {
    var items = JSON.parse(fs.readFileSync("items.json"))
    var stats = JSON.parse(fs.readFileSync("stats.json"))
    console.log(chalk.grey("Items in inventory: ") + items.length)
    console.log(chalk.blue("---------------"))
    items.forEach(item => {
        console.log(chalk.green("Name: " + chalk.yellow(item.name)))
        console.log(chalk.red("Attack power: ") + item.ap)
        console.log(chalk.blue("Description: " + chalk.magenta(item.description)))
        console.log(chalk.cyan("Type: " + chalk.green.inverse(item.type)))
        console.log(chalk.blue("---------------"))
    });
}

module.exports = {
    equip: equip,
    showInventory: showInventory
}