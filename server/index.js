const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

const port_number = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Rotas
app.post("/customer", async (req, res) => {
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

app.get("/customer", async (req, res) => {
  try {
    const allCustomers = await pool.query("SELECT * FROM Customers")
    res.json(allCustomers.rows)
  } catch (err) {
    console.error(err.message)
  }
})

app.get("/customer/route", async (req, res) => {
  try {
    const allCustomers = await pool.query("SELECT * FROM Customers")
    const shortesRouteResult =
      orderCustomersByShortestRoute(allCustomers.rows)

    res.json(shortesRouteResult)
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(port_number, () => {
  console.log("Server inicializado no port " + port_number)
})

function orderCustomersByShortestRoute(customers) {
  let connectedPath = {}
  const companyAddress = { x_address: 0, y_address: 0 }
  let startingPathToCustomers = {}

  customers.forEach(c => {
    startingPathToCustomers[c.customer_id] = calcDistance(companyAddress, c)

    let pathToNeighboors = {}
    pathToNeighboors["end"] = calcDistance(c, companyAddress)

    let neighboors = customers.filter(neighboor => neighboor.customer_id != c.customer_id)
    neighboors.forEach(neighboor => {
      pathToNeighboors[neighboor.customer_id] = calcDistance(c, neighboor)
    })
    connectedPath[c.customer_id] = pathToNeighboors
  })

  connectedPath["start"] = startingPathToCustomers
  connectedPath["end"] = {}

  let result = findShortestPath(connectedPath)
  let totalDistance = result.totalDistance

  result.path.pop()
  result.path.shift()

  orderedCustomers =
    result.path.map(node => customers.find(c => c.customer_id == node))

  return { customers: orderedCustomers, totalDistance }
}

function findShortestPath(graph) {
  let currentNode = graph['start']
  let totalDistance = 0
  const path = ['start']

  while (Object.keys(currentNode).length) {
    let neighboorKeysList = Object.keys(currentNode)
    let nearestNeighboorKey = ''
    let nearestNeighboorDistance = Infinity

    while (neighboorKeysList.length) {
      const currentNeighboorKey = neighboorKeysList.shift()
      const currentNeighboorDistance = currentNode[currentNeighboorKey]

      if (path.includes(currentNeighboorKey)) {
        continue
      }

      const isLastNode = (currentNeighboorKey === 'end' &&
        path.length === Object.keys(graph).length - 1)

      if (isLastNode) {
        nearestNeighboorKey = currentNeighboorKey
        nearestNeighboorDistance = currentNeighboorDistance
        continue
      }

      if (currentNeighboorDistance < nearestNeighboorDistance && currentNeighboorKey !== 'end') {
        nearestNeighboorKey = currentNeighboorKey
        nearestNeighboorDistance = currentNeighboorDistance
      }
    }

    path.push(nearestNeighboorKey)
    totalDistance += nearestNeighboorDistance
    currentNode = graph[nearestNeighboorKey]
  }

  return { path, totalDistance }
}

function calcDistance(A, B) {
  return Math.sqrt(
    ((B.x_address - A.x_address) ** 2) + ((B.y_address - A.y_address) ** 2)
  )
}