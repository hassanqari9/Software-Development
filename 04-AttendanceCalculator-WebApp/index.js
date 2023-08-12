const fs = require('fs') 
let count;
// document.querySelector("button").addEventListener('click',function(){
    count = fs.readFileSync("./notes.txt")
    count++;
    let string = count.toString()
    fs.writeFileSync('notes.txt',string)
    console.log(count)
// })
