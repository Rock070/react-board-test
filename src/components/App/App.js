import './App.css';
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import Header from '../Header'
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Root = styled.div``

function App() {
  
  return(
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage /> 
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </Root>

  )}


export default App;