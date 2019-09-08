import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ListItem, Rating, SearchBar } from "react-native-elements";
import { Picker, Form } from "native-base";
import { Spinner } from "@shoutem/ui";

import Axios from "axios";

class FindTrails extends Component {
  static navigationOptions = {
    title: "Find Trails",
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
    error: null,
    zip: "",
    lon: null,
    lat: null,
    distance: "50"
  };

  getLocation() {
    this.setState({ isLoading: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: null
        });
        const { lat, lon, distance } = this.state;
        const locationSearch = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${distance}&maxResults=500&sort=distance&key=200482461-145880d2afee92517e23bef39c761571`;
        Axios.get(locationSearch)
          // .then(response => console.log(response))
          // pull the data
          .then(response =>
            response.data.trails.map(trail => ({
              name: `${trail.name}`,
              id: `${trail.id}`,
              stars: `${trail.stars}`,
              pic: `${trail.imgSqSmall}`
            }))
          )
          //Update trails object
          .then(trails =>
            this.setState({
              trails,
              isLoading: false
            })
          )
          //Handle Errors
          .catch(error => this.setState({ error, isLoading: false }));
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 1000 }
    );
  }

  onValueChange(value) {
    this.setState({
      distance: value
    });
    this.getLocation();
  }

  updateSearch = zip => {
    this.setState({ zip });
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, trails, error } = this.state;
    return (
      <View style={{ height: 700 }}>
        <View style={styles.topRow}>
          <View style={{ flex: 4 }}>
            <SearchBar
              placeholder='Zip Code...'
              onChangeText={this.updateSearch}
              value={this.state.zip}
              containerStyle={{ backgroundColor: "rgb(27, 28, 32)" }}
            />
          </View>
          <View
            style={{
              flex: 2,
              paddingTop: 10,
              paddingLeft: 15,
              backgroundColor: "rgb(27, 28, 32)"
            }}
          >
            <Form>
              <Picker
                mode='dropdown'
                placeholder='50 Miles'
                placeholderStyle={{ color: "#2874F0" }}
                textStyle={{ color: "white" }}
                note={false}
                selectedValue={this.state.distance}
                onValueChange={this.onValueChange.bind(this)}
              >
                <Picker.Item label='10 Miles' value='10' />
                <Picker.Item label='50 Miles' value='50' />
                <Picker.Item label='100 Miles' value='100' />
                <Picker.Item label='200 Miles' value='200' />
              </Picker>
            </Form>
          </View>

          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
        <ScrollView>
          {!isLoading ? (
            trails.map(trail => (
              <ListItem
                key={trail.id}
                title={trail.name}
                leftAvatar={
                  trail.pic != ""
                    ? { source: { uri: trail.pic } }
                    : { icon: { name: "photo" } }
                }
                onPress={() =>
                  this.props.navigation.navigate("TrailDetails", {
                    itemId: `${trail.id}`,
                    trailName: `${trail.name}`
                  })
                }
                subtitle={
                  <Rating
                    style={styles.starRating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(trail.stars)}
                  />
                }
                chevron={true}
                topDivider={true}
              />
            ))
          ) : (
            // <Text style={styles.loading}>Loading...</Text>

            <Spinner size='large' style={styles.loading} />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  topRow: {
    flexDirection: "row"
  },
  starRating: {
    marginRight: 170
  },
  loading: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginTop: 250
  }
});

export default FindTrails;
