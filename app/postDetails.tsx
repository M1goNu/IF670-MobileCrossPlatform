import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getPostDetail, getUserDetail } from "./services/api";

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { userId } = useLocalSearchParams<{ userId: string }>();

    const [user, setUser] = useState<any>(null);
    const [post, setPost] = useState<any>(null);

    useEffect(()=>{
        if (id) {
            getPostDetailData();
            getUserData();
        }
    }, []);

    const getUserData = () => {
        getUserDetail(Number(userId)).then((res) =>{
            if(res.status === 200){
                setUser(res.data);
                console.log(res.data);
            }else{
                console.log("error");
            }
        });
    };

    const getPostDetailData = () => {
        getPostDetail(Number(id)).then((res) =>{
            if(res.status === 200){
                setPost(res.data);
                console.log(res.data);
            }else{
                console.log("error");
            }
        });
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{textAlign:"center",fontWeight:"bold"}}>{post?.title}</Text>
            <Text style={{textAlign:"center"}}>{post?.body}</Text>
            <Text style={{ marginTop: 10 }}>Post Created By</Text>
            <Text>Name: {user?.name}</Text>
            <Text>Email: {user?.email}</Text>
        </View>
    );
}