import React, {useState} from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet,Text } from 'react-native'

const CreateUserScreen = () => {
    const [state, setState] = useState({
        nombre: '',
        email: '',
        numeroCel: '',

    });

    const cambiarEstado = (propiedad, valor) => {
        setState({...state, [propiedad]: valor});
    } 

    return(
        <ScrollView style={styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Nombre del usuario" onChange={(value) => cambiarEstado("nombre",value)}/>
            </View>

            <View style = {styles.inputGroup}>
                <TextInput placeholder="Email del usuario"  onChange={(value) => cambiarEstado("email",value)}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder="Numero móvil"  onChange={(value) => cambiarEstado("numeroCel",value)}/>
            </View>

            <View>
                <Button title="Crear usuario" onPress={() => console.log(state)}/>
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