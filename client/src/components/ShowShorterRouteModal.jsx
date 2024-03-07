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
} from 'semantic-ui-react'

export default function ShowShorterRouteModal({ customers, openModalButton }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={openModalButton}
    >
      <ModalHeader>Menor caminho</ModalHeader>
      <ModalContent>
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
                customers.map(customer =>
                  <TableRow key={customer.customer_id}>
                    <TableCell>{customer.customer_id}</TableCell>
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