// // callback
// function run(value, running) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(value);
//             running()
//         }, 2000)
//     })
// }

// run(1, () => {
//     run(2, () => {
//         run(3, () => {
//             console.log('success');
//         })
//     })
// })


// // promise
// function run(value) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log(value);
//             resolve('Success')
//         }, 2000)
//     })
// }

// run(1).then((res) => {
//     return run(2)
// }).then((res) => {
//     return run(3)
// }).then((res) => {
//     console.log(res);
// })


// // async-await
function run(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(value);
            resolve('Success')
        }, 2000)
    })
}

run(1).then((res) => {
    return run(2)
}).then((res) => {
    return run(3)
}).then((res) => {
    console.log(res);
})