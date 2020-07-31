const {
    checkHp,
    enemyTurnAI,
    attackEnemy,
    healSelf,
    createGame,
    gameLoop,
    loadGame,
    saveGame,
    displayMainMenu,
    inventoryLoop
} = require("./scripts/gameLoop.js");
const {warpShop} = require("./scripts/shop.js")
const {buyItem} = require("./scripts/shop.js")
const chalk = require("chalk");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

global.api = {
    checkHp,
    enemyTurnAI,
    attackEnemy,
    healSelf,
    createGame,
    gameLoop,
    inventoryLoop,
    loadGame,
    saveGame,
    displayMainMenu,
    warpShop,
    readline,
    buyItem,
    data: null,
    playerInv: null
}

displayMainMenu();
//readline.close();

//Im trash at coding xd