const express = require('express')
const app = express()
const cors = require('cors')

const port_number = 5000

app.use(cors())
app.use(express.json())

app.listen(port_number, () => {
    console.log("Server inicializado no port " + port_number)
})
