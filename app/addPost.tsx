import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { addPostStyles as styles } from "./appStyle";
import { postData } from "./services/api";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!title || !body || !userId) {
            Alert.alert("Error", "Semua field harus diisi!");
            return;
        }
        setLoading(true);
        postData({
            title: title,
            body: body,
            userId: Number(userId),
        })
            .then((res) => {
                if (res.status === 201) {
                    console.log("Post created:", res.data);
                    Alert.alert("Berhasil", "Post berhasil ditambahkan!", [
                        { text: "OK", onPress: () => router.back() },
                    ]);
                } else {
                    Alert.alert("Error", "Gagal menambahkan post.");
                }
            })
            .catch((err) => {
                console.log("error", err);
                Alert.alert("Error", "Terjadi kesalahan.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Add New Post</Text>

            <Text style={styles.label}>User ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan User ID"
                keyboardType="numeric"
                value={userId}
                onChangeText={setUserId}
            />
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Masukkan judul post"
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Body</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Masukkan isi post"
                multiline
                numberOfLines={5}
                value={body}
                onChangeText={setBody}
            />
            <View style={styles.buttonRow}>
                <Pressable
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={[styles.submitButton, loading && styles.disabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.submitText}>
                        {loading ? "Submitting..." : "Submit"}
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}