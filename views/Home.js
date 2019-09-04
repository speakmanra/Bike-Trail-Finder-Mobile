import React from "react";
import { View, Text, Button } from "react-native";

class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#7a0800"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title='Find Trails'
          onPress={() => this.props.navigation.navigate("FindTrails")}
        />
      </View>
    );
  }
}

export default Home;
