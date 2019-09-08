import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ListItem, Rating, Button } from "react-native-elements";
import { Picker, Icon } from "native-base";
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
    },
    headerRight: (
      <Picker
        mode='dropdown'
        iosHeader='Filter'
        iosIcon={<Icon name='arrow-down' />}
        style={{ color: "white" }}
        // selectedValue={this.state.selected}
        // onValueChange={this.onValueChange.bind(this)}
      >
        <Picker.Item label='Wallet' value='key0' />
        <Picker.Item label='ATM Card' value='key1' />
        <Picker.Item label='Debit Card' value='key2' />
        <Picker.Item label='Credit Card' value='key3' />
        <Picker.Item label='Net Banking' value='key4' />
      </Picker>
    )
  };
  state = {
    isLoading: false,
    trails: [],
    error: null,
    address: "",
    lon: null,
    lat: null
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
        const { lat, lon } = this.state;
        const locationSearch = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=200482461-145880d2afee92517e23bef39c761571`;
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

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, trails, error } = this.state;
    return (
      <View stgityle={{ height: 700 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* <Button
            onPress={() => this.getLocation()}
            title='Get Location'
            type='outline'
            style={{ marginTop: 10, marginBottom: 10 }}
          /> */}
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
