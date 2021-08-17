import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("Users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        console.log(user);
    };
    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);
    return (
        <ScrollView>
            <Button
                title="Volver"
                onPress={() => props.navigation.navigate("UserList")}
            />
            <Text>Users List</Text>
        </ScrollView>
    );
};

export default UserDetailScreen;
