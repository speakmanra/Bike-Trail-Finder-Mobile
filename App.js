import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FindTrails from "./views/FindTrails";
import Home from "./views/Home";
import TrailDetails from "./views/TrailDetails";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

const navigator = createStackNavigator(
  {
    Home: Home,
    FindTrails: FindTrails,
    TrailDetails: TrailDetails
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {}
  }
);

export default createAppContainer(navigator);
