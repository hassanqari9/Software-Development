document.querySelector("#nav-button").addEventListener("click",handleclick)
function handleclick (){
    document.querySelector(".seconddiv").classList.toggle("display-block")
}

document.querySelector(".slider1").addEventListener("click",() => {
    document.querySelector(".card-wraper2").style.left = "0%"
})
document.querySelector(".slider2").addEventListener("click",() => {
    document.querySelector(".card-wraper2").style.left = "-100%"
})
document.querySelector(".slider3").addEventListener("click",() => {
    document.querySelector(".card-wraper2").style.left = "-200%"
})