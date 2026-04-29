import { Dimensions, StyleSheet } from "react-native";

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
  mapContainer: {
    height: height * 0.6,
    width: "100%",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    alignItems: "center",
    transform: [{ translateX: -20 }, { translateY: -44 }],
  },
  markerIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  markerShadow: {
    width: 10,
    height: 4,
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: 2,
  },
  info: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  coordText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  buttonSpacing: {
    marginTop: 12,
  },
  modeBadge: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  modeBadgeText: {
    color: "#fff",
    fontSize: 13,
  },
  modeToggleContainer: {
    position: "absolute",
    right: 12,
    top: "40%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modeButtonActive: {
    backgroundColor: "#007AFF",
  },
  modeButtonText: {
    fontSize: 18,
  },
  modeButtonLabel: {
    fontSize: 11,
    color: "#555",
    marginTop: 2,
  },
  modeButtonTextActive: {
    color: "#fff",
  },

  refreshButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  refreshButtonDisabled: {
    backgroundColor: "#aaa",
  },
  refreshContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  refreshText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
