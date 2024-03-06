import './App.css';
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
  return (
    <Container className='padding-y-24px'>
      <Header as='h1'>Acompanha Limpeza</Header>
      <Grid columns={2} className='content' divided>
        <GridColumn className='column-content'>
          <CreateCustomerComponent />
        </GridColumn>
        <GridColumn>
          <CustomersListComponent />
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default App;
