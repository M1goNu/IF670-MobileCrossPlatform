import * as Location from "expo-location";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Button, Image, Text, TouchableOpacity, View, } from "react-native";
import MapView, { MapPressEvent, Marker, Region, UrlTile } from "react-native-maps";
import { styles } from "./appStyle";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Mode = "tap" | "drag";

export default function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [markerCoords, setMarkerCoords] = useState<Coordinates | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mode, setMode] = useState<Mode>("tap");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const mapRef = useRef<MapView>(null);

  const getLocation = async (): Promise<void> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied! Please allow location access.");
      return;
    }

    setIsRefreshing(true);

    const loc = await Location.getCurrentPositionAsync({});
    const coords: Coordinates = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    };

    setLocation(coords);
    setMarkerCoords(coords);

    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      500
    );

    setIsRefreshing(false);
  };

  const handleRegionChangeStart = () => {
    if (mode === "drag") setIsDragging(true);
  };

  const handleRegionChange = (region: Region) => {
    if (mode === "drag" && isDragging) {
      setMarkerCoords({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  const handleRegionChangeComplete = (region: Region) => {
    if (mode === "drag") {
      setIsDragging(false);
      setMarkerCoords({
        latitude: region.latitude,
        longitude: region.longitude,
      });
    }
  };

  const handleMapPress = (e: MapPressEvent) => {
    if (mode !== "tap") return;
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoords({ latitude, longitude });
    mapRef.current?.animateToRegion(
      { latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 },
      300
    );
  };

  const initialRegion: Region | undefined = location
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
        <View style={styles.center}>
          <Button title="Get Geo Location" onPress={getLocation} />
        </View>
      ) : (
        <>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={initialRegion}
              onRegionChangeStart={handleRegionChangeStart}
              onRegionChange={handleRegionChange}
              onRegionChangeComplete={handleRegionChangeComplete}
              onPress={handleMapPress}
              scrollEnabled={mode === "drag"}
            >
              <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {mode === "tap" && markerCoords && (
                <Marker
                  coordinate={markerCoords}
                  title="My Location"
                  draggable={false}
                />
              )}
            </MapView>

            {mode === "drag" && (
              <View style={styles.markerContainer} pointerEvents="none">
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                  }}
                  style={[
                    styles.markerIcon,
                    isDragging && { transform: [{ translateY: -8 }] },
                  ]}
                />
                <View style={styles.markerShadow} />
              </View>
            )}
            <View style={styles.modeBadge}>
              <Text style={styles.modeBadgeText}>
                {mode === "drag"
                  ? isDragging
                    ? "🖐 Geser peta..."
                    : "🖐 Mode Drag"
                  : "👆 Mode Tap"}
              </Text>
            </View>

            <View style={styles.modeToggleContainer}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "tap" && styles.modeButtonActive,
                ]}
                onPress={() => setMode("tap")}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === "tap" && styles.modeButtonTextActive,
                  ]}
                >
                  👆
                </Text>
                <Text
                  style={[
                    styles.modeButtonLabel,
                    mode === "tap" && styles.modeButtonTextActive,
                  ]}
                >
                  Tap
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "drag" && styles.modeButtonActive,
                ]}
                onPress={() => setMode("drag")}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === "drag" && styles.modeButtonTextActive,
                  ]}
                >
                  🖐
                </Text>
                <Text
                  style={[
                    styles.modeButtonLabel,
                    mode === "drag" && styles.modeButtonTextActive,
                  ]}
                >
                  Drag
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>📍 Posisi Marker</Text>
            <Text style={styles.coordText}>
              Latitude: {markerCoords?.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordText}>
              Longitude: {markerCoords?.longitude.toFixed(6)}
            </Text>

            <TouchableOpacity
              style={[
                styles.refreshButton,
                isRefreshing && styles.refreshButtonDisabled,
              ]}
              onPress={getLocation}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <View style={styles.refreshContent}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.refreshText}>Mencari lokasi...</Text>
                </View>
              ) : (
                <Text style={styles.refreshText}>🔄 Refresh Location</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}