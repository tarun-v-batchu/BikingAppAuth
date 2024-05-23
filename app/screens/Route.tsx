import React, { useRef, useEffect } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View } from 'react-native';

const Route = ({ route }) => {
  const { location, initialLocation } = route.params;
  const mapRef = useRef(null);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC7XD9rqMaatgG4ON8ADsLV0MTa0IH5YHU';

  const getLocationCoord = (location) => {
    if (location) {
      return {
        latitude: location.latitude,
        longitude: location.longitude,
      };
    }
    return { latitude: 0, longitude: 0 }; // Default to some valid coordinates
  };

  const originCoords = getLocationCoord(initialLocation);
  const destinationCoords = getLocationCoord(location);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(
        [originCoords, destinationCoords],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [originCoords, destinationCoords]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: originCoords.latitude,
          latitudeDelta: 0.1609688373654521,
          longitude: originCoords.longitude,
          longitudeDelta: 0.10375495342158558,
        }}
        style={{ flex: 1 }}
      >
        <MapViewDirections
          origin={originCoords}
          destination={destinationCoords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
            if (mapRef.current) {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              });
            }
          }}
          onError={(errorMessage) => {
            console.log('GMaps Directions API error: ', errorMessage);
          }}
        />
      </MapView>
    </View>
  );
};

export default Route;
