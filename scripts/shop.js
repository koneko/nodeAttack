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
    console.log("Shopkeeper: If you would like to exit, please type 'back' to go to the shop menu.")
    api.readline.question("I would like to buy: ", (itemName) => {
        if(itemName === "back") {
            api.warpShop()
        } else {
            var shopInv = JSON.parse(fs.readFileSync("data/shopInventory.json"))
            let item = shopInv.find((shopItem) => itemName == shopItem.name);
                try {
                    console.log("Shopkeeper: " + chalk.blue("Let me check your stats."))
                    if(api.data.player.level >= item.level) {
                        if(api.data.player.gold >= item.value) {
                            //purchase success
                            var newPlayerGold = api.data.player.gold - item.value
                            api.data.player.gold = newPlayerGold
                            api.saveGame()
                            if(item.type == "armor") {
                                giveItem(item.name, item.description, item.type, item.level, item.value, item.protection)
                            } else if (item.type == "weapon") {
                                giveItem(item.name, item.description, item.type, item.level, item.value, item.strength)
                            }
                            console.log("Shopkeeper: " + chalk.yellow(`Nice choice. That'll be ${item.value} gold. After your payment you will have ${newPlayerGold} gold.`))
                            api.warpShop()
                        } else {
                            console.log(`Shopkeeper: ${chalk.red("Sadly you do not have enough gold to buy this item.")}`)
                            api.warpShop()
                        }
                    } else {
                        console.log(`Shopkeeper: ${chalk.red("Sorry, your level does not match the item's level.")}`)
                        api.warpShop()
                    }
                } catch(e) {
                    // console.log(e)
                    console.log(chalk.red("The item you input is not real. Try again. Item names are CASE sensitive."));
                    api.buyItem()
                }
        }

        
    })
}

const giveItem = function(name, description, type, level, value, strength) {
    var playerInv = JSON.parse(fs.readFileSync("data/inventory.json"))
    if(type == "weapon") {
        playerInv.push({
            name: name,
            description: description,
            type: type,
            level: level,
            value: value,
            strength: strength
        })
    } else if (type == "armor") {
        playerInv.push({
            name: name,
            description: description,
            type: type,
            level: level,
            value: value,
            protection: strength
        })
    }

    var playerInvStringified = JSON.stringify(playerInv)
    fs.writeFileSync("data/inventory.json", playerInvStringified)
    // console.log(playerInvStringified)
}

// "name" :"Spiked Gloves",
// "description": "Gloves with spikes. A little addon to your fists.",
// "type": "weapon",
// "level": 1,
// "value": 10,
// "strength": 2
var shopInv = JSON.parse(fs.readFileSync("data/shopInventory.json"))
module.exports = {
    warpShop,
    buyItem
}


