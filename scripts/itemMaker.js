const fs = require("fs")
const chalk = require("chalk")
const gameLoop = require("./gameLoop")
var shopInv = JSON.parse(fs.readFileSync("data/shopInventory.json"))


const createItem = function(name, description, type, level, value, strength) {
    shopInv.push({
        name: name,
        description: description,
        type: type,
        level: level,
        value: value,
        strength: strength
    })
    var shopInvStringified = JSON.stringify(shopInv)
    fs.writeFileSync("data/shopInventory.json", shopInvStringified)
    api.gameLoop()
    // console.log(chalk.greenBright("Success!"))
    // console.log(chalk.greenBright("The item has been created!"))
}

const makerMenu = function() {
    api.readline.question("Item name: ", (name) => {
        api.readline.question("Item description: ", (description) => {
            api.readline.question("Item type: ", (type) => {
                api.readline.question("Item level: ", (level) => {
                    api.readline.question("Item value: ", (value) => {
                        api.readline.question("Item strength: ", (strength) => {
                            // console.log(name)
                            // console.log(description)
                            // console.log(type)
                            // console.log(level)
                            // console.log(value)
                            // console.log(strength)
                            createItem(name, description, type, +level, +value, +strength)
                            console.log(chalk.greenBright("Item created.\nHere are the stats:"))
                            console.log(chalk.yellowBright(`Item name: ${name}`))
                            console.log(chalk.yellowBright(`Item description: ${description}`))
                            console.log(chalk.yellowBright(`Item type: ${type}`))
                            console.log(chalk.yellowBright(`Item level: ${level}`))
                            console.log(chalk.yellowBright(`Item value: ${value}`))
                            console.log(chalk.yellowBright(`Item strength: ${strength}`))
                            api.gameLoop()
                        })
                    })
                })
            })
        })
    })
}
// makerMenu()

module.exports = {
    createItem,
    makerMenu
}