const fs = require("fs")
const chalk = require("chalk");

const showShopInventory = function() {
    var shopInv = JSON.parse(fs.readFileSync("data/shopInventory.json"))
    console.log(`Shopkeeper: Here are the items in my shop.`)
    console.log(chalk.grey("--------------------"))
    console.log(`Shopkeeper: Lets see here... I have ${shopInv.length} items in my inventory.`)
    console.log("Shopkeeper: Here are their stats listed individualy.")
    console.log(chalk.grey("--------------------"))
    shopInv.forEach(item => {
        console.log(chalk.blue(`Type: ${item.type}`))
        console.log(chalk.red(`Name: ${item.name}`))
        console.log(chalk.green(`Description: ${item.description}`))
        console.log(chalk.cyan(`Required level: ${item.level}`))
        console.log(chalk.yellow(`Value: ${item.value}`))
        console.log(chalk.magenta(`Strength: ${item.strength}`))
        console.log(chalk.grey("--------------------"))
    });
}

const warpShop = function() {
    //to go back to menu, use gameloop
    console.log("buy  - Buys an item from the shop")
    console.log("back - Brings you back to the game menu")
    api.readline.question("Choose an action: ", (action) => {
        if(action === "buy") {
            buyItem()
        } else if(action === "back") {
            api.gameLoop()
        } else {
            console.log(chalk.red("The action you input is invalid. Please retype it."))
            api.warpShop()
        }
    })
    // buyItem(data)
}

const buyItem = function() {
    showShopInventory()
    api.readline.question("I would like to buy: ", (itemName) => {
        var shopInv = JSON.parse(fs.readFileSync("data/shopInventory.json"))
        let item = shopInv.find((shopItem) => itemName == shopItem.name);
        if(item === null) {
            console.log("The item you input is not real. Try again.");
            buyItem()
        } else {
            console.log(chalk.blue("Shopkeeper: Let me check your stats."))
            if(api.data.player.level >= item.level) {
                if(api.data.player.gold >= item.value) {
                    console.log(chalk.red("Yay!"))
                    api.warpShop()
                } else {
                    console.log(`Shopkeeper: ${chalk.red("Sadly you do not have enough gold to buy this item.")}`)
                    api.warpShop()
                }
            } else {
                console.log(`Shopkeeper: ${chalk.red("Sorry, your level does not match the item's level.")}`)
                api.warpShop()
            }
        }
        
    })
}

module.exports = {
    warpShop
}


