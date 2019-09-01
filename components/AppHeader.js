import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "react-native-elements";

const AppHeader = () => {
  return (
    <Header
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "MTB Trials", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
      backgroundColor='#7a0800'
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AppHeader;
