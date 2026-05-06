import { Camera } from "expo-camera";
import { File, Paths } from "expo-file-system/next";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";
import { Alert, Button, Image, Text, View } from "react-native";
import { styles } from "./appStyle";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  // 📷 OPEN CAMERA
  const openCamera = async () => {
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
    }
  };

  // 🖼️ OPEN GALLERY
  const openGallery = async () => {
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
    }
  };

  // 💾 SAVE IMAGE
  const saveImage = async () => {
    if (!image) {
      alert("No image to save!");
      return;
    }

    try {
      const fileName = `saved_image_${Date.now()}.jpg`;
      const dest = new File(Paths.document, fileName);
      const source = new File(image);
      source.copy(dest);

      await MediaLibrary.saveToLibraryAsync(dest.uri);

      Alert.alert("Success", "Image saved to gallery successfully!");
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to save image.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Rifqi Aldino Amin - 00000093743
      </Text>

      <View style={styles.button}>
        <Button title="OPEN CAMERA" onPress={openCamera} />
      </View>

      <View style={styles.button}>
        <Button title="OPEN GALLERY" onPress={openGallery} />
      </View>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />

          <View style={styles.button}>
            <Button title="SAVE IMAGE" onPress={saveImage} />
          </View>
        </>
      )}
    </View>
  );
}