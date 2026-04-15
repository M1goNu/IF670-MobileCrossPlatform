import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { postDetailStyles as styles } from "./appStyle";
import { getComments, getPostDetail, getUserDetail } from "./services/api";

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { userId } = useLocalSearchParams<{ userId: string }>();

    const [user, setUser] = useState<any>(null);
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            getPostDetailData();
            getUserData();
            getCommentsData();
        }
    }, []);

    const getUserData = () => {
        getUserDetail(Number(userId)).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
            } else {
                console.log("error");
            }
        });
    };

    const getPostDetailData = () => {
        getPostDetail(Number(id)).then((res) => {
            if (res.status === 200) {
                setPost(res.data);
            } else {
                console.log("error");
            }
        });
    };

    const getCommentsData = () => {
        getComments(Number(id)).then((res) => {
            if (res.status === 200) {
                setComments(res.data);
            } else {
                console.log("error");
            }
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Post Detail */}
            <View style={styles.postCard}>
                <Text style={styles.postTitle}>{post?.title}</Text>
                <Text style={styles.postBody}>{post?.body}</Text>
            </View>

            {/* Author Info */}
            <View style={styles.authorCard}>
                <Text style={styles.authorHeading}>Post Created By</Text>
                <Text style={styles.authorInfo}>👤 {user?.name}</Text>
                <Text style={styles.authorInfo}>✉️ {user?.email}</Text>
            </View>

            {/* Comments Section */}
            <Text style={styles.commentsHeading}>
                💬 Comments ({comments.length})
            </Text>
            {comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                    <Text style={styles.commentName}>{comment.name}</Text>
                    <Text style={styles.commentEmail}>{comment.email}</Text>
                    <Text style={styles.commentBody}>{comment.body}</Text>
                </View>
            ))}
        </ScrollView>
    );
}