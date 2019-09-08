import React, { Component, Fragment } from "react";
import { View, Button, ActivityIndicator, StyleSheet } from "react-native";
import { Image, Rating, Text, Divider } from "react-native-elements";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

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
    // ---------------------------------
    // TESTER
    // const trailLink =
    //   "https://www.mtbproject.com/data/get-trails-by-id?ids=4670265&key=200482461-145880d2afee92517e23bef39c761571";
    // ---------------------------------

    Axios.get(trailLink)
      // .then(response => console.log(response))
      // pull the data
      .then(response =>
        response.data.trails.map(trail => ({
          name: `${trail.name}`,
          id: `${trail.id}`,
          stars: trail.stars,
          pic: `${trail.imgMedium}`,
          difficulty: `${trail.difficulty}`,
          length: `${trail.length}`,
          status: `${trail.conditionStatus}`,
          statusDetails: `${trail.conditionDetails}`,
          statusDate: `${trail.conditionDate}`,
          location: `${trail.location}`,
          summary: `${trail.summary}`
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
    const {
      stars,
      pic,
      length,
      difficulty,
      status,
      statusDetails,
      statusDate,
      location,
      summary
    } = this.state.trails[0];
    //Theres gotta be a better way to do this check -----------------
    let difficultySymbol;
    if (difficulty === "green") {
      difficultySymbol = (
        <Image
          source={require("../assets/green.png")}
          style={styles.difficultySymbol}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    } else if (difficulty === "blue") {
      difficultySymbol = (
        <Image
          source={require("../assets/blue.png")}
          style={styles.difficultySymbol}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    } else if (difficulty === "blueBlack") {
      difficultySymbol = (
        <Image
          source={require("../assets/blueBlack.png")}
          style={styles.difficultySymbol}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    } else if (difficulty === "black") {
      difficultySymbol = (
        <Image
          source={require("../assets/black.png")}
          style={styles.difficultySymbol}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    } else {
      difficultySymbol = (
        <Image
          source={require("../assets/Default.png")}
          style={styles.difficultySymbol}
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    }
    //-----------------------------------------------------
    return (
      <View style={{ flex: 1, backgroundColor: "#cccccc" }}>
        <ScrollView>
          <Image
            source={{
              uri: pic
            }}
            style={styles.pictureStyle}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={styles.topRow}>
            {difficultySymbol}

            <Rating
              style={styles.starRating}
              ratingTextColor='black'
              readonly
              imageSize={30}
              startingValue={parseFloat(stars)}
            />
            <Text style={{ fontSize: 20, marginTop: 26 }}>{length} Mi</Text>
          </View>
          <View style={styles.bodyStyle}>
            <Text h4 style={styles.titleStyle}>
              Location: {location}
            </Text>

            <Divider style={{ marginTop: 10, height: 2 }} />
            <Text style={styles.textStyle}>{summary}</Text>
            <Divider style={{ marginTop: 10, height: 2 }} />
            <Text h4 style={styles.textStyle}>
              Trail Conditions: {status}
            </Text>

            <Text style={styles.textStyle}>{statusDetails}</Text>
            <Text style={styles.textStyle}>as of {statusDate}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topRow: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: 10
  },
  textStyle: {
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
    color: "black"
  },
  pictureStyle: {
    width: 375,
    height: 300,
    alignSelf: "center",
    padding: 0
  },
  difficultySymbol: {
    width: 50,
    height: 50,
    alignSelf: "center",
    padding: -5,
    marginTop: 10,
    backgroundColor: "white"
  },
  starRating: {
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10,
    alignSelf: "center"
  },
  bodyStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  titleStyle: { textAlign: "center", marginTop: 10 }
});

export default TrailDetails;
