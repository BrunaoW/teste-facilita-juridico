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

export default function CustomersListComponent() {
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
            <TableRow>
              <TableCell>Bruno</TableCell>
              <TableCell>brunowilson4@gmail.com</TableCell>
              <TableCell>31996411435</TableCell>
              <TableCell>(10, 10)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <ShowShorterRouteModal
        openModalButton={
          <Button className='my-3' fluid>Obter menor caminho de entrega</Button>
        }
      />
    </>
  )
}