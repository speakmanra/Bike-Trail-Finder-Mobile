import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Axios from "axios";

class GetTrails extends Component {
  state = {
    isLoading: true,
    trails: [],
    error: null
  };

  getUsers() {
    // Where we're fetching data from
    Axios.get(
      "https://www.mtbproject.com/data/get-trails?lat=36.162663&lon=-86.781601&maxDistance=10&key=200482461-145880d2afee92517e23bef39c761571"
    )
      // .then(response => console.log(response))
      // We get the API response and receive data in JSON format...

      .then(response =>
        response.data.trails.map(trail => ({
          name: `${trail.name}`,
          id: `${trail.id}`,
          stars: `${trail.stars}`
        }))
      )

      // ...then we update the users state

      .then(trails =>
        this.setState({
          trails,
          isLoading: false
        })
      )

      // Catch any errors we hit and update the app

      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    console.log(this.state.trails);
    const { isLoading, trails, error } = this.state;
    return (
      <View>
        <Text>Nearby Trails</Text>
        {!isLoading ? (
          trails.map(trail => (
            <ListItem
              key={trail.id}
              title={trail.name}
              subtitle={trail.stars}
            />
          ))
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    );
  }
}

export default GetTrails;
