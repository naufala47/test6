/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tambah from './Page/Tambah/Tambah';
import List from './Page/List/List';
import Edit from './Page/Edit/Edit';

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen name="List" component={List} options={{ title: '' }} />
          <Stack.Screen name="Tambah" component={Tambah} options={{ title: '' }} />
          <Stack.Screen name="Edit" component={Edit} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
export default App;