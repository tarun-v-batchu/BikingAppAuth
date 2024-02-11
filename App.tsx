import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login'
import List from './app/screens/List'
import Map from './app/screens/Map'
import FormScreen from './app/screens/FormScreen'
import Block from './app/screens/Block'
import { User, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from './FirebaseConfig'
import { Text, Button, StyleSheet, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="details" component={FormScreen} />
      <InsideStack.Screen name="map" component={Map} />
      <InsideStack.Screen name="block" component={Block} />
    </InsideStack.Navigator>
  )
}

// let locationsOfInterest = [
//   {
//     title: "First",
//     location: {
//       latitude: 37.33,
//       longitude: -122.019,
//     },
//     description: "My First Marker"
//   }
// ]

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState<User | null>(null)
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    longitude: 37.5,
    latitude: -122.5
  });
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  // const onRegionChange = (region: any) => {
  //   console.log(region);
  // };

  // const showLocationOfInterest = () => {
  //   return locationsOfInterest.map((item, index) => {
  //     return (
  //       <Marker
  //         key={index}
  //         coordinate={item.location}
  //         title={item.title}
  //         description= {item.description}
  //       >
  //         <Callout>
  //           <Text>Count: {count}</Text>
  //           <Button title='Increment Count' onPress={() => setCount(count + 1)}/>
  //         </Callout>
  //       </Marker>
  //     )
  //   });
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Form'>
        <Stack.Screen name='Form' component={InsideLayout} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login'>
    //     {user ? (
    //       <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }}/>
    //     ) : (
    //       <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
})

const MyTheme = {
  dark: false,
  colors: {
    background: '#f0f8ff',
  },
};

;

