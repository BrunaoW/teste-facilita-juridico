import './App.css';
import React from 'react'

import {
  Header,
  Container,
  Grid,
  GridColumn,
  Button
} from 'semantic-ui-react'

import CreateCustomerComponent from './components/CreateCustomerComponent'
import CustomersListComponent from './components/CustomersListComponent'

function App() {
  const [customers, setCustomersList] = React.useState([])

  const getCostumers = async () => {
    try {
      const response = await fetch("http://localhost:5000/customer")
      const jsonData = await response.json()
      setCustomersList(jsonData)
    } catch (error) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    getCostumers()
  }, [])

  return (
    <Container className='padding-y-24px'>
      <Header as='h1'>Acompanha Limpeza</Header>
      <Grid columns={2} className='content' divided>
        <GridColumn className='column-content'>
          <CreateCustomerComponent
            reloadCustomerList={getCostumers}
          />
        </GridColumn>
        <GridColumn>
          <CustomersListComponent
            customers={customers}
          />
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default App;
