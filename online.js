const request = require("request")
const url = "https://nodeattack.github.io/version.html";


request({url : url}, (error, Response) => {
    console.log(Response.body)
})