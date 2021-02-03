const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

// adding route handler
//get info from user -> req
//communicate with user -> res
app.get('/', (req, res) => {
    res.send(`
    <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Submit</button>
        </form>
    </div>
    `)
})

app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Account created!!')
})
//start to listen to incomming network trafic
app.listen(3000, () => {
    console.log('Listening')
})