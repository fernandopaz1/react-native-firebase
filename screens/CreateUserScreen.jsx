import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet,Text } from 'react-native'
import firebase from '../database/firebase';

const CreateUserScreen = () => {
    const [state, setState] = useState({
        nombre: '',
        email: '',
        numeroCel: ''
    });

    const cambiarEstado = (propiedad, valor) => {
        setState({...state, [propiedad]: valor});
    } 
    console.log(state.nombre)
    const addNewUser = async () => {
        console.log(`Nombre ${state.nombre}`)
        console.log(`email ${state.email}`)
        console.log(`cel ${state.numeroCel}`)
        console.log(state)
        if(state.name === ''){
            alert('Por favor ingrese un nombre')
            return
        }
        if(state.email === ''){
            alert('Por favor ingrese un email')
            return
        }else if(state.numeroCel === ''){
            alert('Por favor ingrese un nuemero')
            return
        }

        try {
            await firebase.db.collection('Users').add({
                name: state.name,
                email: state.email,
                phone: state.numeroCel,
            })
            // alert('Guardado')
        } catch (error) {
            console.log(error)
        }
    
    //    console.log(state)
    }

    return(
        <ScrollView style={styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Nombre del usuario" onChange={(value) => setState({ nombre: value})}/>
            </View>

            <View style = {styles.inputGroup}>
                <TextInput placeholder="Email del usuario"  onChange={(value)=>setState({email: value})}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Numero móvil"  onChange={(value) => setState({numeroCel: value})}/>
            </View>

            <View>
                <Button title="Crear usuario" onPress={() => addNewUser()}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    inputGroup: {
        flex:1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth:1,
        borderBottomColor: '#cccccc'
    }
})

export default CreateUserScreen