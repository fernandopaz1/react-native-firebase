import React, { useEffect, useState } from "react";
import { Button, View, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import firebase from "../database/firebase";


const UserDetailScreen = (props) => {
    const [state, setState] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
    })

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("Users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        console.log(user);
        setState({...user, id: doc.id})
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Name"
                    value={state.name}
                    onChangeText={(event)=>handleChangeText(event.nativeEvent.text, "name")}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User email"
                    value={state.email}
                    onChangeText={(event)=>handleChangeText(event.nativeEvent.text, "email")}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name Phrone"
                    value={state.phone}
                    onChangeText={(event)=>handleChangeText(event.nativeEvent.text, "phone")}/>
            </View>
            <View>
            <Button
                title="Update User"
                color= "green"
                onPress={()=> alert("actualizado")}
            />
            </View>
            <View>
                
            <Button
                title="Delete User"
                color= "red"
                onPress={()=> alert("eliminado")}
            />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
});

export default UserDetailScreen;
