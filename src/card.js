// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    minWidth: 350,
    margin: 10,
  },
  media: {
    height: 200,
  },
};

class Cardd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div onClick={() => {window.open(this.props.url, '_blank')}}>
      <Card style={styles.card}>
        {this.props.date}
        <br></br>
        <b>{this.props.city.charAt(0).toUpperCase() + this.props.city.slice(1)}</b>
        <CardMedia
          style={styles.media}
          image={this.props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {this.props.title}
          </Typography>
          <Typography component="p">
            {this.props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button dense color="primary">
            Share
          </Button>
          <Button dense color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
  }
}


export default Cardd;
