import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';

class App extends React.Component {
  render(){
    return(
      <div className="App">
        <Link to="/">
          <h1>Adopt me!</h1>
        </Link>
        <Router>  
          <Results path="/" />
          <Details path="/details/:id" />
          <SearchParams path="/search-params" />
        </Router>
      </div>
    )
  }
}


render(React.createElement(App), document.getElementById("root"));
