import React from 'react'

import {
  Header,
  Button,
  Form,
  FormGroup,
  FormInput,
  FormField,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Radio
} from 'semantic-ui-react'

import ShowShorterRouteModal from './ShowShorterRouteModal'

export default function CustomersListComponent({ customers }) {
  return (
    <>
      <Header as='h3'>Clientes</Header>
      <Form widths='equal'>
        <FormInput label='Filtrar' icon='search' />
        <FormGroup>
          <FormField fluid widths='equal'>
            <Radio label='Nome' name='radioGroup' defaultChecked />
          </FormField>
          <FormField fluid widths='equal'>
            <Radio label='E-mail' name='radioGroup' />
          </FormField>
          <FormField fluid widths='equal'>
            <Radio label='Telefone' name='radioGroup' />
          </FormField>
        </FormGroup>
      </Form>
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
            {
              customers.map(customer =>
                <TableRow key={customer.customer_id}>
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
      <ShowShorterRouteModal
        customers={customers}
        openModalButton={
          <Button fluid>
            Obter menor caminho de entrega
          </Button>
        }
      />
    </>
  )
}