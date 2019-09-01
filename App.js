import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppHeader from "./components/AppHeader";
import GetTrails from "./components/GetTrails";

export default function App() {
  return (
    <View>
      <AppHeader />
      <GetTrails />
    </View>
  );
}
