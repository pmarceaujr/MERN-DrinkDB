import React, { Component } from 'react';
import { GET_DRINKS } from '../queries/queries';
//import { useQuery } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import './App.css';

const App = () => (
  <div className="App">
    <h1>Home page gone wild!</h1>
    <Query query={GET_DRINKS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Something went wrong</div>
        console.log(data)
        return (
          <p>Drinks</p>
        )
      }
      }
    </Query>
  </div>
)

export default App;
