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
  const [selectedFilterType, onChangeFilterType] = React.useState("name")
  const [filteredCustomers, onChangeFilteredCustomers] =
    React.useState([])

  const filterCustomers = (textToFilter) => {
    if (!textToFilter) {
      onChangeFilteredCustomers(customers)
      return
    }

    const textToFilterLowerCase = textToFilter.toLowerCase()
    switch (selectedFilterType) {
      case 'name':
        onChangeFilteredCustomers(
          customers.filter(c =>
            c.customer_name.toLowerCase().includes(textToFilterLowerCase)
          )
        )
        break
      case 'email':
        onChangeFilteredCustomers(
          customers.filter(c =>
            c.email.toLowerCase().includes(textToFilterLowerCase)
          )
        )
        break
      case 'phone':
        onChangeFilteredCustomers(
          customers.filter(c =>
            c.phone.toLowerCase().includes(textToFilterLowerCase)
          )
        )
        break
    }
  }

  React.useEffect(() => {
    onChangeFilteredCustomers(customers)
  }, [])

  return (
    <>
      <Header as='h3'>Clientes</Header>
      <Form widths='equal'>
        <FormInput
          label='Filtrar'
          icon='search'
          onKeyUp={(e) => filterCustomers(e.target.value)}
        />
        <FormGroup>
          <FormField fluid widths='equal'>
            <Radio
              label='Nome'
              name='radioGroup'
              value="name"
              checked={selectedFilterType === 'name'}
              onChange={(_, e) => onChangeFilterType(e.value)}
            />
          </FormField>
          <FormField fluid widths='equal'>
            <Radio
              label='E-mail'
              name='radioGroup'
              value="email"
              checked={selectedFilterType === 'email'}
              onChange={(_, e) => onChangeFilterType(e.value)}
            />
          </FormField>
          <FormField fluid widths='equal'>
            <Radio
              label='Telefone'
              name='radioGroup'
              value="phone"
              checked={selectedFilterType === 'phone'}
              onChange={(_, e) => onChangeFilterType(e.value)}
            />
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
              (
                filteredCustomers.length > 0 ? filteredCustomers : customers
              ).map(customer =>
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
          <Button disabled={!customers.length} fluid>
            Obter menor caminho de entrega
          </Button>
        }
      />
    </>
  )
}