import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UserList = (props) => {
    const [users, setUsers] = useState([]);

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
        });
    }, []);

    return (
        <ScrollView>
            <Button
                title="Crear Usuario"
                onPress={() => props.navigation.navigate("CreateUserScreen")}
            />
            {users.map((user) => {
                return (
                    <ListItem key={user.id}>
                        <ListItem.Chevron />
                        <Avatar
                            source={{
                                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                            }}
                            rounded
                        />
                        <ListItem.Content>{user.name}</ListItem.Content>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>

                        <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};

export default UserList;
