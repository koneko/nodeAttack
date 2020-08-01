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
const devPassword = "koneko69420";
const {warpShop} = require("./scripts/shop.js")
const {buyItem} = require("./scripts/shop.js")
const chalk = require("chalk");
const {makerMenu} = require("./scripts/itemMaker.js")
const {createItem} = require("./scripts/itemMaker.js")
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

global.api = {
    devPassword,
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
    createItem,
    makerMenu,
    data: null,
    playerInv: null
}

displayMainMenu();
//readline.close();

//Im trash at coding xd