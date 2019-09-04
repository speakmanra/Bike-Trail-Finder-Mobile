import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";

class TrailDetails extends Component {
  static navigationOptions = {
    title: "Trail Details",
    headerStyle: {
      backgroundColor: "#7a0800"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  state = {
    isLoading: false,
    trails: [],
    error: null
  };

  componentDidMount() {
    console.log(this.props.children);
  }
  // get the id of the link that was clicked from FindTrails
  // match the id of the link with the MTB API
  // display the info that matches that id

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{
            uri:
              "https://cdn-files.apstatic.com/mtb/7002944_medium_1554403854.jpg"
          }}
          style={{ width: 200, height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    );
  }
}

export default TrailDetails;
