import React from "react";
import { View, Text } from "react-native";
import { Image, ActivityIndicator, Button } from "react-native-elements";

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
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            raised
            title="Find Trails"
            onPress={() => this.props.navigation.navigate("FindTrails")}
          />
        </View>
      </View>
    );
  }
}

export default Home;
