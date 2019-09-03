import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

class CurrentLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000 }
    );
  }

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => this.getLocation()} title='Get Location' />
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}
export default CurrentLocation;
