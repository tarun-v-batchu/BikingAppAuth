import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from "react";
import { Text, Button, StyleSheet, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';
import { NavigationProp } from '@react-navigation/native';
import { Router } from 'express';

const Stack = createNativeStackNavigator();

function InsideLayout() {
    // return (
    //   <Stack.Navigator>
    //     <Stack.Screen name="My todos" component={List} />
    //     <Stack.Screen name="details" component={Details} />
    //     <Stack.Screen name="map" component={Map} />
    //     <Stack.Screen name="block" component={Block} />
    //   </Stack.Navigator>
    // )
  }

let locationsOfInterest = [
  {
    title: "First",
    location: {
      latitude: 37.33,
      longitude: -122.019,
    },
    description: "My First Marker"
  }
]

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

export default function App({navigation} : RouterProps) {
  const [count, setCount] = useState(0);

  const onRegionChange = (region: any) => {
    console.log(region);
  };

  const showLocationOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description= {item.description}
        >
          <Callout>
            <Text>Count: {count}</Text>
            <Button title='Blocks' onPress={() => navigation.navigate('block')}/>
          </Callout>
        </Marker>
      )
    });
  };

  return (

    <View style={styles.container}>
      <MapView 
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          "latitude": 37.332224490236456,
          "latitudeDelta": 0.1609688373654521,
          "longitude": -122.0194604824104,
          "longitudeDelta": 0.10375495342158558
          }}
        >
          {showLocationOfInterest()}
      </MapView>

    </View>

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
});