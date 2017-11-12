import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Cardd from './card.js'
import Results from './Results.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        value: event.target.value,
        city: undefined
    });
  }

  handleSubmit(event) {
    this.setState({
      city: this.state.value
    });
    console.log("Handled submit, set state to:", this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to LGBT Roomates!</h1>
      </header>
      <br></br>
      <br></br>
        <form onSubmit={this.handleSubmit}>
           <label>
             Enter area to search for
             <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
           </label>
           &nbsp;
           <input type="submit" className="btn btn-primary" value="Submit" />
         </form>

         <Results
          city={this.state.city}>
         </Results>

      </div>
    );
  }
}

export default App;
