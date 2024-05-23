import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from "react";
import { Text, Button, StyleSheet, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps';
import { NavigationProp } from '@react-navigation/native';
import { Router } from 'express';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import firestore from '@react-native-firebase/firestore';



const Stack = createNativeStackNavigator();

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
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forms, setForms] = useState([])

  // const fetchLocation = () => {
  //   (async () => {
  //     setLocation(fetchLocation)
  //   })
  // }

  const fetchForms = async () => {
    const formsCollection = firestore().collection('forms');
    const formsSnapshot = await formsCollection.get();
    const formsList = formsSnapshot.docs.map(doc => doc.data());
    // setForms(formsList);
  };
    

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
    })();
  }, []);

    

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onRegionChange = (region: any) => {
    console.log(region);
  };

  const getLocationCoord = (location: Location.LocationObject | null) => {
    if (location) {
      console.log(location.coords)
      return location.coords
    }
    console.log("Location is null")
    return null
  }

  const showLocationOfInterest = () => {
    let markers = locationsOfInterest.map((item, index) => {
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
            <Button title='Route' onPress={() => navigation.navigate('route', { location: getLocationCoord(location), initialLocation: item.location })}/>
          </Callout>
        </Marker>
      )
    });
  
    // Check if the location state is not null and add the current location marker
    if (location) {
      markers.push(
        <Marker
          key="current_location"
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }}
          title="My Location"
          description="This is where I am now"
        />
      );
    }
  
    return markers;
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