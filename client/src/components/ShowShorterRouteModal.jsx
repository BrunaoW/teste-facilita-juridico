import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  Modal,
  Dimmer,
  Loader
} from 'semantic-ui-react'

export default function ShowShorterRouteModal({ openModalButton }) {
  const [open, setOpen] = React.useState(false)
  const [shortestRouteData, setShortestRouteData] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

  const onOpenModal = () => {
    setOpen(true)
    getCostumersOrederedByShortestPath()
  }

  const onCloseModal = () => {
    setOpen(false)
  }

  const getCostumersOrederedByShortestPath = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/customer/route")
      const jsonData = await response.json()
      setShortestRouteData(jsonData)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
    }
  }

  return (
    <Modal
      onOpen={onOpenModal}
      onClose={onCloseModal}
      open={open}
      trigger={openModalButton}
    >
      <ModalHeader>Menor caminho</ModalHeader>
      <ModalContent>
        <Dimmer active={isLoading}>
          <Loader>Carregando</Loader>
        </Dimmer>
        <div className='container__table'>
          <Table basic='very' celled>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Ordem</TableHeaderCell>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>E-mail</TableHeaderCell>
                <TableHeaderCell>Telefone</TableHeaderCell>
                <TableHeaderCell>Endereço</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {
                shortestRouteData.customers &&
                shortestRouteData.customers.map((customer, index) =>
                  <TableRow key={customer.customer_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{customer.customer_name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>({customer.x_address}, {customer.y_address})</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
        {
          shortestRouteData.totalDistance &&
          <p>Distância total para atendimento dos clientes: {shortestRouteData.totalDistance.toFixed(2)}</p>
        }
      </ModalContent>
      <ModalActions>

        <Button
          content="Ok"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  )
}