// locomotive scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    tablet: { smooth: true },
    smartphone: { smooth: true },
});

// navbar animation
const zero = document.querySelector("#zero");
max = -1;
scroll.on("scroll", (args) => {
    // console.log(args.scroll.y);
    if (args.scroll.y > max) {
        max = args.scroll.y;
        //   console.log("Increasing");
        zero.style.top = "-150px";
    } else {
        max = args.scroll.y;
        //   console.log("Decreaing");
        zero.style.top = "0px";
    }
    // bool = this.oldScroll > this.scrollY
    //   console.log(bool);
    // if (bool) {
    //   zero.style.top = '0px'
    // }
    // else {
    //   zero.style.top = '-150px'
    // }
    // this.oldScroll = this.scrollY;
});

// newnav navbar animation
navbutton = document.querySelector(".navbutton");
newnav = document.querySelector(".newnav");
let i = 0;
navbutton.addEventListener("click", () => {
    i++;
    if (i % 2 !== 0) {
        // onClick Menu+
        navbutton.innerHTML = "close";
        newnav.classList.add("newnavAnimation");
        newnav.classList.remove("newnavAnimation2");
    } else {
        // onClick close
        navbutton.innerHTML = "Menu+";
        newnav.classList.add("newnavAnimation2");
    }
});

// heading left right moving animation on scroll
heading1 = document.querySelector(".heading1");
heading2 = document.querySelector(".heading2");
scroll.on("scroll", (args) => {
    heading1.style.marginLeft = -(args.scroll.y / 2) + "px";
    heading2.style.marginLeft = args.scroll.y / 2 + "px";
});

// background color change animation on scroll
body = document.querySelector("body");
button = document.querySelectorAll(".btn");
logo = document.querySelectorAll("#six img");

three = document.querySelector("#three");
five = document.querySelector("#five");
seven = document.querySelector("#seven");
const threetop = three.offsetTop - 500;
const fivetop = five.offsetTop - 500;
const seventop = seven.offsetTop - 500;
scroll.on("scroll", (args) => {
    // console.log('args.scroll.y: '+args.scroll.y);
    // console.log('threetop: '+threetop);
    // console.log('fivetop: '+fivetop);
    // console.log('seventop: '+ seventop);
    if (
        (args.scroll.y > threetop && args.scroll.y < fivetop) ||
        args.scroll.y > seventop
    ) {
        body.style.backgroundColor = "var(--darkgrey)";
        body.style.color = "var(--textlight)";
        button.forEach((element) => {
            element.style.backgroundColor = "var(--textlight)";
            element.style.color = "var(--textdark)";
        });
        logo.forEach((element) => {
            element.style.filter = "invert(1)";
        });
    } else {
        body.style.backgroundColor = "var(--light)";
        body.style.color = "var(--textdark)";
        button.forEach((element) => {
            element.style.backgroundColor = "var(--darkgrey)";
            element.style.color = "var(--textlight)";
        });
        logo.forEach((element) => {
            element.style.filter = "invert(0)";
        });
    }
});
button.forEach((ele) => {
    ele.addEventListener("mouseover", () => {
        ele.style.backgroundColor = "var(--purple)";
        ele.style.color = "var(--textdark)";
    });
});
button.forEach((ele) => {
    ele.addEventListener("mouseout", () => {
        if (
            (args.scroll.y > threetop && args.scroll.y < fivetop) ||
            args.scroll.y > seventop
        ) {
            ele.style.backgroundColor = "var(--light)";
            ele.style.color = "var(--textdark)";
        } else {
            ele.style.backgroundColor = "var(--darkgrey)";
            ele.style.color = "var(--textlight)";
        }
    });
});
