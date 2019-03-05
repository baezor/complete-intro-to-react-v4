import React from 'react';

class Hero extends React.Component {
  render(){
    return(
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Adopt a Pet
            </h1>
            <h2 className="subtitle">
              Find the best life partner.
            </h2>
          </div>
        </div>
      </section>
    )
  }
}
export default Hero;