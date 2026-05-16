import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
    }
});

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
    width: 150,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  resultContainer: {
    width: "100%",
    marginTop: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  resultImage: {
    width: "100%",
    height: 300,
  },
  locationBox: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    width: "100%",
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 13,
    color: "#333",
  },
  loadingContainer: {
    marginTop: 16,
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    color: "#555",
    fontSize: 13,
  },
  anotherButton: {
    marginTop: 20,
    width: "100%",
  },
});