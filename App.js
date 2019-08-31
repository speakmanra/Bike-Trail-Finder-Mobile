import React from "react";
import { StyleSheet, Text, View } from "react-native";

import FetchTest from "./components/FetchTest";

export default function App() {
  return (
    <View style={styles.container}>
      <FetchTest />
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
