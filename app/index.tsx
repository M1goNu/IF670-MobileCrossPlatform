import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Indexstyles as styles } from "./appStyle";
import { getPosts } from "./services/api";

export default function Index() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = () => {
        getPosts().then((res) => {
            if (res.status === 200) {
                setPosts(res.data);
            } else {
                console.log("error");
            }
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {posts.map((post) => (
                    <Pressable
                        key={post.id}
                        style={styles.card}
                        onPress={() =>
                            router.push({
                                pathname: "/postDetails",
                                params: {
                                    id: post.id,
                                    userId: post.userId,
                                },
                            })
                        }
                    >
                        <Text style={styles.postNumber}>Post #{post.id}</Text>
                        <Text style={styles.postTitle}>{post.title}</Text>
                        <Text style={styles.postBody} numberOfLines={2}>
                            {post.body}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>

            {/* Floating Button */}
            <Pressable
                style={styles.fab}
                onPress={() => router.push("/addPost")}
            >
                <Text style={styles.fabText}>+ Add New Post</Text>
            </Pressable>
        </View>
    );
}