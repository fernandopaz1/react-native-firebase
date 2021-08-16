import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

const UserDetailScreen = (props) => {
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
