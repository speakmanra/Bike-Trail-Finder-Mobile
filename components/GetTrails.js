import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

class GetTrails extends Component {
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
    return <View style={styles.container}>{this.state.trails}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GetTrails;
