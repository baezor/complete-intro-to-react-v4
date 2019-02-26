import React from 'react';
import { render } from 'react-dom';
import { Router, Link } from '@reach/router';
import pf from 'petfinder-client';
import { Provider } from './SearchContext';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';

import './style.css';


const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      location: 'Seattle, WA',
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  }
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value,
        breed: ''
      },
      this.getBreeds
    );
  }
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    })
  }
  getBreeds(){
    if(this.state.animal){
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if(
            data.petfinder && 
            data.petfinder.breeds && 
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({ breeds: [] })
          }
        })
        .catch(console.error);
    } else {
      this.setState({ 
        breeds: [] 
      });
    }
  }

  render(){
    return(
      <div className="App">
        <Link to="/">
          <h1>Adopt me!</h1>
        </Link>
        <Link to="/search-params">
        <span arial-label="search" role="img">
        search
        </span>
        </Link>
        <Provider value={this.state}>
          <Router>  
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    )
  }
}


render(React.createElement(App), document.getElementById("root"));
