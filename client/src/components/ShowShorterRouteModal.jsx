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

export default function ShowShorterRouteModal({ openModalButton }) {
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
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>E-mail</TableHeaderCell>
                <TableHeaderCell>Telefone</TableHeaderCell>
                <TableHeaderCell>Endereço</TableHeaderCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>Bruno</TableCell>
                <TableCell>brunowilson4@gmail.com</TableCell>
                <TableCell>31996411435</TableCell>
                <TableCell>(10, 10)</TableCell>
              </TableRow>
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