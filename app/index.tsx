import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import MapView, { Marker, Region, UrlTile } from "react-native-maps";
import { styles } from "./appStyle";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);

  //async function to get the user's current location
  const getLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied! Please allow location access.");
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  // Define the region for the map based on the user's location
  const region: Region | undefined = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : undefined;

  return (
    <View style={styles.container}>
      {!location ? (
        <Button title="Get Geo Location" onPress={getLocation} />
      ) : (
        <>
          <MapView style={styles.map} initialRegion={region}>
            {/* OpenStreetMap Tile */}
            <UrlTile urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker */}
            <Marker coordinate={location} title="My Location" />
          </MapView>

          <View style={styles.info}>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>

            <Button title="Refresh Location" onPress={getLocation} />
          </View>
        </>
      )}
    </View>
  );
}

