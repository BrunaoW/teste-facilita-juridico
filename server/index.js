const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

const port_number = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Rotas
app.post("/customer", async(req, res) => {
    try {
        const customer = req.body
        const newCustomer = await pool.query(
            `INSERT INTO Customers 
                    (customer_name,
                    email,
                    phone,
                    x_address,
                    y_address) 
             VALUES ($1, $2, $3, $4, $5)
          RETURNING *`,
            [
                customer.name,
                customer.email,
                customer.phone,
                customer.x_address,
                customer.y_address
            ]
        )
        res.json(newCustomer.rows[0])
        console.log(req.body)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/customer", async(req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM Customers")
        res.json(allCustomers.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/customer/route", async(req, res) => {
    try {
        // TODO: Listar todos os clientes, e calcular a rota e ordem 
        //       com menor distância saindo do ponto (0, 0), percorrendo todos 
        //       os clientes 
        console.log(req.body)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(port_number, () => {
    console.log("Server inicializado no port " + port_number)
})
