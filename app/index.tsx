import { Camera } from "expo-camera";
import { File, Paths } from "expo-file-system/next";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Image, ScrollView, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { requestNotificationPermission, sendFailedNotification, sendSuccessNotification } from "../lib/notification";
import { supabase } from "../lib/supabase";
import { styles } from "./appStyle";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // 📷 OPEN CAMERA
  const openCamera = async () => {
    setSaved(false);
    const permission = await Camera.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLocation(null);
    }
  };

  // 🖼️ OPEN GALLERY
  const openGallery = async () => {
    setSaved(false);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setLocation(null);
    }
  };

  // 💾 SAVE IMAGE 
  const saveImage = async () => {
    if (!image) {
      alert("No image to save!");
      return;
    }

    setLoading(true);
    let latitude = 0;
    let longitude = 0;

    try {
      // 1. Ambil lokasi
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required!");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      latitude = loc.coords.latitude;
      longitude = loc.coords.longitude;

      // 2. Simpan ke galeri lokal
      const fileName = `photo-${Date.now()}.jpeg`;
      const dest = new File(Paths.document, fileName);
      const source = new File(image);
      source.copy(dest);
      await MediaLibrary.saveToLibraryAsync(dest.uri);

      // 3. Upload ke Supabase Storage
      const response = await fetch(image);
      const arrayBuffer = await response.arrayBuffer();

      const { error: storageError } = await supabase.storage
        .from("images")
        .upload(`camera/${fileName}`, arrayBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (storageError) throw storageError;

      // 4. Ambil public URL
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(`camera/${fileName}`);

      const imageUrl = urlData.publicUrl;

      // 5. Insert ke tabel map
      const { error: dbError } = await supabase
        .from("map")
        .insert([{
          latitude: latitude.toString(),
          longitude: longitude.toString(),
          image_url: imageUrl,
        }]);

      if (dbError) throw dbError;

      // 6. Kirim notifikasi sukses
      await sendSuccessNotification(latitude, longitude);

      setLocation({ latitude, longitude });
      setSaved(true);

    } catch (error: any) {
      console.error("Error:", error);

      // Kirim notifikasi gagal
      await sendFailedNotification(
        latitude,
        longitude,
        error.message ?? "Unknown error"
      );

      Alert.alert("Error", error.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Rifqi Aldino Amin - 00000093743</Text>

      {saved && location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Foto diambil di sini"
              description={`${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
            />
          </MapView>

          <View style={styles.resultContainer}>
            <Image
              source={{ uri: image ?? undefined }}
              style={styles.resultImage}
              resizeMode="cover"
            />
            <View style={styles.locationBox}>
              <Text style={styles.locationTitle}>📍 Lokasi Foto</Text>
              <Text style={styles.locationText}>Latitude : {location.latitude.toFixed(6)}</Text>
              <Text style={styles.locationText}>Longitude: {location.longitude.toFixed(6)}</Text>
            </View>
          </View>

          <View style={styles.anotherButton}>
            <Button
              title="📷 Take Another Picture"
              onPress={() => {
                setImage(null);
                setLocation(null);
                setSaved(false);
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.button}>
            <Button title="OPEN CAMERA" onPress={openCamera} />
          </View>

          <View style={styles.button}>
            <Button title="OPEN GALLERY" onPress={openGallery} />
          </View>

          {image && (
            <>
              <Image source={{ uri: image }} style={styles.image} />

              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                  <Text style={styles.loadingText}>
                    Menyimpan gambar...
                  </Text>
                </View>
              ) : (
                <View style={styles.button}>
                  <Button title="SAVE IMAGE" onPress={saveImage} />
                </View>
              )}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}