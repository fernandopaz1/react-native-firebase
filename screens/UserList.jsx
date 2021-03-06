import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, ActivityIndicator } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase.db.collection("Users").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                const { name, email, phone } = doc.data();
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                });
            });
            setUsers(users);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <View>
            <ActivityIndicator size="large" color="#9e9e9e"/>
        </View>
    }

    return (
        <ScrollView>
            <Button
                title="Crear Usuario"
                onPress={() => props.navigation.navigate("CreateUserScreen")}
            />
            {users.map((user) => {
                return (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={() =>
                            props.navigation.navigate("UserDetailScreen", {
                                userId: user.id,
                            })
                        }
                    >
                        <ListItem.Chevron />
                        <Avatar
                            source={{
                                uri: "https://picsum.photos/128/128",
                            }}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>

                            <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};

export default UserList;
