const express = require('express')
const cors = require('cors');
require('./db/mongoose')
const usersRouter = require('./routers/users')
const mosqueDataRouter = require('./routers/mosqueData') 

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use(usersRouter)
app.use(mosqueDataRouter)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})