import React from "react";
import { StyleSheet, Text, View } from "react-native";

import AppHeader from "./components/AppHeader";
import GetTrails from "./components/GetTrails";

export default function App() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <GetTrails />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
