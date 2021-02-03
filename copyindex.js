// //this file was created to save the progress of the tutorial
// //bodyparser was exchanged to a 3rd party library

// const express = require('express')

// const app = express()

// // adding route handler
// //get info from user -> req
// //communicate with user -> res
// app.get('/', (req, res) => {
//     res.send(`
//     <div>
//         <form method="POST">
//             <input name="email" placeholder="email" />
//             <input name="password" placeholder="password" />
//             <input name="passwordConfirmation" placeholder="password confirmation" />
//             <button>Submit</button>
//         </form>
//     </div>
//     `)
// })

// //mdlware func
// const bodyParser = (req, res, next) => {
//     if (req.method === 'POST') {
//         req.on('data', data => {
//             const parsed = data.toString('utf8').split('&')
//             const formData = {}
//             for (let pair of parsed) {
//                 const [key, value] = pair.split('=')
//                 formData[key] = value
//             }
//             //console.log(formData)
//             req.body = formData
//             next()
//         })
//     } else {
//         next()
//     }
// }

// app.post('/', bodyParser, (req, res) => {
//     // //get acc to email, psw, pswConfirm
//     // //'.on' is similar to 'addEventListener'
//     // //in this case, we're listening to the 'data' event
//     // req.on('data', data => {
//     //     //console.log(data.toString('utf8')) take buffer and turn it into a string in utf8 format
//     //     const parsed = data.toString('utf8').split('&');
//     //     const formData = {}
//     //     for (let pair of parsed) {
//     //         const [key, value] = pair.split('=') //pair->take 1st el and assign it to 'key', then take the 2nd el and assign it to 'value'
//     //         formData[key] = value
//     //     }
//     //     console.log(formData)
//     // })
//     console.log(req.body)
//     res.send('Account created!!')
// })
// //start to listen to incomming network trafic
// app.listen(3000, () => {
//     console.log('Listening')
// })