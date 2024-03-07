import React from 'react'

import {
  Header,
  Form,
  FormGroup,
  FormInput,
  FormButton,
  Message
} from 'semantic-ui-react'

export default function CreateCustomerComponent({ reloadCustomerList }) {
  const [name, changeName] = React.useState("")
  const [email, changeEmail] = React.useState("")
  const [phone, changePhone] = React.useState("")
  const [x_address, changeXAddress] = React.useState("")
  const [y_address, changeYAddress] = React.useState("")

  const [creationHasSuccess, changeCreationHasSuccess] = React.useState(false)
  const [creationHasFailed, changeCreationHasFailed] = React.useState(false)

  const clearFields = () => {
    changeName("")
    changeEmail("")
    changePhone("")
    changeXAddress("")
    changeYAddress("")
  }

  const createCustomer = async () => {
    const body = {
      name,
      email,
      phone,
      x_address,
      y_address
    }

    try {
      const response = await fetch("http://localhost:5000/customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      const jsonData = await response.json()
      clearFields()
      changeCreationHasSuccess(true)
      changeCreationHasFailed(false)
      reloadCustomerList()
    } catch (error) {
      console.log(error.message)
      changeCreationHasSuccess(false)
      changeCreationHasFailed(true)
    }
  }

  return (
    <>
      <Header as='h3'>Cadastro</Header>
      <div className='container__form'>
        <Form
          onSubmit={createCustomer}
        >
          <FormGroup widths='equal'>
            <FormInput
              required
              fluid
              label='Nome'
              value={name}
              onChange={(e) => changeName(e.target.value)}
            />
            <FormInput
              required
              fluid
              label='E-mail'
              value={email}
              onChange={(e) => changeEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <FormInput
              required
              fluid
              value={phone}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              label='Telefone'
              onChange={(e) => changePhone(e.target.value)}
            />
            <FormInput
              required
              fluid
              value={x_address}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              label='Endereço X'
              onChange={(e) => changeXAddress(e.target.value)}
            />
            <FormInput
              required
              fluid
              value={y_address}
              onKeyPress={(event) => {
                if (!/^-?\d+$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              label='Endereço Y'
              onChange={(e) => changeYAddress(e.target.value)}
            />
          </FormGroup>
          <FormButton
            disabled={
              !(name.length &&
                email.length &&
                phone.length &&
                x_address.length &&
                y_address.length)
            }
            fluid
          >Cadastrar</FormButton>
        </Form>
        {
          creationHasSuccess &&
          <Message
            success={creationHasSuccess}
            header='Sucesso'
            content="Cliente cadastrado com sucesso"
          />
        }
        {
          creationHasFailed &&
          <Message
            error={creationHasFailed}
            header='Erro'
            content='Ocorreu um erro ao cadastrar cliente'
          />
        }
      </div>
    </>
  )
}