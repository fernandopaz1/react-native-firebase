import React, { useEffect, useState } from "react";
import { Button, View, TextInput, ScrollView, StyleSheet, ActivityIndicator, Platform } from "react-native";
import firebase from "../database/firebase";



const UserDetailScreen = (props) => {
    const [state, setState] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
    })

    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("Users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        console.log(user);
        setState({...user, id: doc.id})
        setLoading(false);
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    const deteleteUser = async () => {
        try {
            const dbRef =  firebase.db.collection("Users").doc(props.route.params.userId)
            await dbRef.delete()
            props.navigation.navigate('UserList');
        } catch (error) {
            console.log(error)
        } 
    }

    const updateUser = async () => {
        try {
            const dbRef =  firebase.db.collection("Users").doc(props.route.params.userId)
            await dbRef.set({
                name: state.name,
                email: state.email,
                phone: state.phone,
            })
            props.navigation.navigate('UserList');
        } catch (error) {
            console.log(error)
        } 
    }

    const openConfirmationAlertDelete = (msg) => {
        if(Platform.OS ==='web'){
            deteleteUser()
            alert("Usuario Eliminado")
        }else{
            alert(
                'Delete user',
                'Are you sure?',
                [ 
                    {text: 'Yes', onPress: ()=> deteleteUser()},
                    {text: 'No', onPress: ()=> console.log('cancelado')},
                ]
            )
        }
    }

    const openConfirmationAlertUpdate = () => {
        if(Platform.OS ==='web'){
            updateUser()
            alert("Usuario Actualizado")
        }else{
            alert(
                'Update user',
                'Are you sure?',
                [ 
                    {text: 'Yes', onPress: ()=> updateUser()},
                    {text: 'No', onPress: ()=> console.log('cancelado')},
                ]
            )
        }
    }

    if (loading) {
        return <View>
            <ActivityIndicator size="large" color="#9e9e9e"/>
        </View>
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User Name"
                    value={state.name}
                    onChangeText={(value)=>handleChangeText(value, "name")}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="User email"
                    value={state.email}
                    onChangeText={(value)=>handleChangeText(value, "email")}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name Phrone"
                    value={state.phone}
                    onChangeText={(value)=>handleChangeText(value, "phone")}/>
            </View>
            <View>
            <Button
                title="Update User"
                color= "green"
                onPress={()=> openConfirmationAlertUpdate()}
            />
            </View>
            <View>
                
            <Button
                title="Delete User"
                color= "red"
                onPress={()=> openConfirmationAlertDelete()}
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
