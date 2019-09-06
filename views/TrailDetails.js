import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Image } from "react-native-elements";
import Axios from "axios";

class TrailDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("trailName", "None"),
    headerStyle: {
      backgroundColor: "#7a0800"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  });
  state = {
    isLoading: false,
    trails: [],
    error: null,
    init: 0
  };

  getTrailDetails() {
    this.setState({ isLoading: true });
    const { navigation } = this.props;
    const trailId = navigation.getParam("itemId", "NO-ID");
    const trailLink = `https://www.mtbproject.com/data/get-trails-by-id?ids=${trailId}&key=200482461-145880d2afee92517e23bef39c761571`;
    Axios.get(trailLink)
      // .then(response => console.log(response))
      // pull the data
      .then(response =>
        response.data.trails.map(trail => ({
          name: `${trail.name}`,
          id: `${trail.id}`,
          stars: trail.stars,
          pic: `${trail.imgSqSmall}`,
          difficulty: `${trail.difficulty}`,
          length: `${trail.length}`,
          status: `${trail.conditionStatus}`
        }))
      )
      //Update trails object
      .then(trails =>
        this.setState({
          trails,
          init: 1,
          isLoading: false
        })
      )
      //Handle Errors
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getTrailDetails();
  }

  // match the id of the link with the MTB API
  // display the info that matches that id

  render() {
    return this.state.init ? (
      <Fragment>{this.renderPage()}</Fragment>
    ) : (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>loading...</Text>
      </View>
    );
  }

  renderPage() {
    const { name, id, stars, pic, length } = this.state.trails[0];
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: pic
          }}
          style={{ width: 250, height: 250 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.textStyle}>Miles: {length}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center"
  }
});

export default TrailDetails;
