import { Dimensions, StyleSheet } from "react-native";

// Get the device's screen height for responsive map sizing
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    height: height * 0.5,
    width: "100%",
  },
  info: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});