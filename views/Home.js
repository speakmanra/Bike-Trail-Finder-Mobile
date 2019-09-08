import React from "react";
import { View, Text } from "react-native";
import { Button, Image } from "react-native-elements";

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
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1490507278117-59a4ccd0165f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          }}
          style={{
            width: 400,
            height: 900,
            position: "absolute",
            alignSelf: "center"
          }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Button
            style={{ marginTop: 250 }}
            buttonStyle={{ backgroundColor: "black" }}
            title='Find Trails'
            icon={{ name: "navigation", color: "white" }}
            onPress={() => this.props.navigation.navigate("FindTrails")}
          />
        </View>
      </View>
    );
  }
}

export default Home;
