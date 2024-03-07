/* 
    Essa função cria uma conexão entre todos os pontos do plano cartesiano e 
    calcula a distância entre cada um desses pontos, executar em seguida o 
    algoritmo de encontrar a rota de menor caminho.
*/
function orderCustomersByShortestRoute(customers) {
  let connectedPath = {}
  const companyAddress = { x_address: 0, y_address: 0 }
  let startingPathToCustomers = {}

  // Calcula a distância de todos os pontos de localização dos clientes entre si
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

  // encontra a rota de menor caminho
  let result = findShortestPath(connectedPath)
  let totalDistance = result.totalDistance

  result.path.pop()
  result.path.shift()

  // ordena a lista de clientes conforme o menor caminho encontrado
  orderedCustomers =
    result.path.map(node => customers.find(c => c.customer_id == node))

  return { customers: orderedCustomers, totalDistance }
}

function findShortestPath(graph) {
  // Inicializa o caminho na matriz da empresa
  let currentNode = graph['start']
  let totalDistance = 0
  const path = ['start']

  // Percorre os vizinhos do nó atual e encontra o mais próximo para ser o 
  // próximo nó até que não tenha mais vizinhos (isto é, chegou no nó final, que
  // é a matriz da empresa)
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

module.exports = orderCustomersByShortestRoute
