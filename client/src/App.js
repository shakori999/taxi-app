import React, { useState} from 'react';
import { 
  Container, Navbar, Button, Form
 } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {Link, Route, Switch } from 'react-router-dom'; 

import SignUp from './component/SignUp';
import LogIn from './component/LogIn';

import './App.css';

function App () {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const logIn = (username, password) => setLoggedIn(true);

  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>Taxi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {
            isLoggedIn &&
            <Form inline className='ml-auto'>
              <Button type='button'>Log out</Button>
            </Form>
          }
        </Navbar.Collapse>
      </Navbar>
      <Container className='pt-3'>
        <Switch>
          <Route exact path='/' render={() => (
            <div className='middle-center'>
              <h1 className='landing logo'>Taxi</h1>
              <Link className='btn btn-primary' to='/sign-up'>Sign Up</Link>
              <Link className='btn btn-primary' to='/log-in'>Log In</Link>
            </div>
          )} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/log-in' render={() => (
            <LogIn logIn={logIn} />
          )}  />
        </Switch>
      </Container>
    </>
  );
}

export default App;
