import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar } from "react-native-elements";

const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        firebase.db.collection("users").onSnapshot((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                console.log(doc.data());
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
            <Text>Users List</Text>
        </ScrollView>
    );
};

export default UserList;
