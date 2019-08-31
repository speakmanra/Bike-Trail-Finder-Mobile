import React, { Component } from "react";
import { View, Text, Stylesheet } from "react-native";

class FetchTest extends Component {
  constructor() {
    super();
    this.state = {
      trails: []
    };
  }

  componentDidMount() {
    fetch(
      "https://www.mtbproject.com/data/get-trails?lat=36.162663&lon=-86.781601&maxDistance=50&key=200482461-145880d2afee92517e23bef39c761571"
    )
      .then(trails => {
        return trails.json();
      })
      .then(data => {
        let trails = data.trails.map(trails => {
          return <Text key={trails.id}>{trails.name}</Text>;
        });
        this.setState({ trails: trails });
      });
  }
  render() {
    return <View>{this.state.trails}</View>;
  }
}

export default FetchTest;
