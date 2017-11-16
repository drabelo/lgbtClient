import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Cardd from './card.js'


class Results extends Component {

  constructor(props) {
    super(props);
    this.state = {listings: ""};
  }

  getCraigslistListings(city) {
    let listings = [];
    let formattedCity = city.replace(" ", '');
    fetch(`https://lgbtserver.herokuapp.com/listings?city=${formattedCity}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let row = [];

      data.sort(function(a, b) {
        console.log(a, b);
        var formattedDateA = new Date(a.postedAt)
        var formattedDateB = new Date(b.postedAt)
        if (formattedDateA > formattedDateB) {
          return -1;
        }
        if (formattedDateA < formattedDateB) {
          return 1;
        }

        // names must be equal
        return 0;
      });


      data.forEach((element, i) => {
        console.log("Each element", element)
        let description = element.description.replace("QR Code Link to This Post", "");
        if (description.length > 300) {
          description = description.substring(0,300) + " ...";
        }

        let city = element.url.split(".")
        var formattedDate
        if (element.updatedAt) {
          formattedDate = new Date(element.updatedAt);
        } else {
          formattedDate = new Date(element.postedAt);
        }

        var date = formattedDate.getMonth() + "-" + formattedDate.getDay()
        console.log("date", date);

        city = city[0].replace("https://", "");
        row.push(<div className="col-md-4">
            <Cardd
              title={element.title}
              url={element.url}
              city={city}
              description={description}
              date={date}
              image={element.images ? `${element.images[0]}` : undefined}>
            </Cardd>
          </div>
        );
        if ((i + 1) % 3 === 0) {
          listings.push(<div class="row">{row} </div>)
          row = [];
        }

      })

      this.setState(pstate => {
        return { listings: listings };
      });

      return listings;
    })
    .catch((error) => {
      this.setState(pstate => {
        return { listings: "No results from craigslist" };
      });
      console.log(error)
    });
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.city) {
      this.setState(pstate => {
        return { listings: "Searching craigslist" };
      });
      console.log("What is prop", nextProps.city);
      this.getCraigslistListings(nextProps.city);
    }
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <div className="container">
            <br></br>
            <br></br>
            <div className="container">
              {this.state.listings}
            </div>
          </div>
        </p>
      </div>
    );
  }
}

export default Results;
