import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// navigation container es un cotenedor de pantallas
import {NavigationContainer} from '@react-navigation/native'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

// esto devuelve un componenete llamado stack
// este stack es el que contiene a nuestras paginas
const Stack = createNativeStackNavigator();


import UserDetailScreen from './screens/UserDetailScreen';
import CreateUserScreen from './screens/CreateUserScreen';
import UserList from './screens/UserList';

// esta funcion es la que va a contener a las multiples pantallas
function MyStack(){
  // devuelvo el componente Stack.Navigator y por cada pantalla que quiero agregar 
  // pongo un Stack.Screen
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateUserList" component={CreateUserScreen} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </Stack.Navigator>

  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
