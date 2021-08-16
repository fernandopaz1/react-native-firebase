import React, { useState } from "react";
import {
    View,
    Button,
    TextInput,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";
import firebase from "../database/firebase";

const CreateUserScreen = (props) => {
    const initalState = {
        name: "",
        email: "",
        phone: "",
    };

    const [state, setState] = useState(initalState);

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    const addNewUser = async () => {
        console.log(`Nombre ${state.name}`);
        console.log(`email ${state.email}`);
        console.log(`cel ${state.phone}`);
        console.log(state.name);
        if (state.name === "") {
            alert("Por favor ingrese un nombre");
            return;
        }
        if (state.email === "") {
            alert("Por favor ingrese un email");
            return;
        } else if (state.phone === "") {
            alert("Por favor ingrese un nuemero");
            return;
        }

        try {
            await firebase.db.collection("Users").add({
                name: state.name,
                email: state.email,
                phone: state.phone,
            });
            alert("Guardado");
            props.navigation.navigate("UserList");
        } catch (error) {
            console.log(error);
        }

        //    console.log(state)
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre del usuario"
                    onChange={(event) =>
                        handleChangeText(event.nativeEvent.text, "name")
                    }
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email del usuario"
                    onChange={(event) =>
                        handleChangeText(event.nativeEvent.text, "email")
                    }
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Numero móvil"
                    onChange={(event) =>
                        handleChangeText(event.nativeEvent.text, "phone")
                    }
                />
            </View>

            <View>
                <Button title="Crear usuario" onPress={() => addNewUser()} />
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

export default CreateUserScreen;
