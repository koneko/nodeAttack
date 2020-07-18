const {
    createGame,
    gameLoop,
    loadGame,
    saveGame,
    displayMainMenu
} = require("./scripts/gameLoop.js");
const {warpShop} = require("./scripts/shop.js")
const {buyItem} = require("./scripts/shop.js")
const chalk = require("chalk");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

global.api = {
    createGame,
    gameLoop,
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