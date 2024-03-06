import {
  Header,
  Form,
  FormGroup,
  FormInput,
  FormButton,
} from 'semantic-ui-react'

export default function CreateCustomerComponent() {
  return (
    <>
      <Header as='h3'>Cadastro</Header>
      <div className='container__form'>
        <Form>
          <FormGroup widths='equal'>
            <FormInput fluid label='Nome' />
            <FormInput fluid label='E-mail' />
          </FormGroup>
          <FormGroup widths='equal'>
            <FormInput fluid label='Telefone' />
            <FormInput fluid label='Endereço X' />
            <FormInput fluid label='Endereço Y' />
          </FormGroup>

          <FormButton fluid>Cadastrar</FormButton>
        </Form>
      </div>
    </>
  )
}