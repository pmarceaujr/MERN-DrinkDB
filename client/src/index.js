import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar'
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Search'
import AddDrink from './components/AddDrink'
import Profile from './components/Profile'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'  //'@apollo/react-hooks';
import withSession from './components/withSession'

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    console.log('gottoken: ' + token)
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }
})
console.log("testsession: " + withSession)

const Root = ({ session }) => (

  <Router>
    <Fragment>
      <Navbar session={session} />

      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/adddrink' component={AddDrink} />
        <Route exact path='/profile' component={Profile} />
        <Redirect to="/" />

      </Switch>
    </Fragment>
  </Router >

);

const RootWithSession = withSession(Root)

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);


