import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { Divider } from 'react-native-elements';


const FormScreen = () => {
  const [loading, setLoading] = useState(false); 
  const [issue, setIssue] = useState(''); 
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [danger, setDanger] = useState('');
  const [dangerIndex, setDangerIndex] = useState(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);


  // Ensure user is authenticated before submitting the form
  const handleSubmit = async () => {
    setLoading(true);
    try {
        const user = FIREBASE_AUTH.currentUser;
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Firestore example
        await addDoc(collection(FIRESTORE_DB, 'forms'), {
            issue: issue,
            location: location,
            danger: danger,
            dangerIndex: dangerIndex
        });

        setLoading(false);
        alert('Form submitted successfully!');
    } catch (error) {
        setLoading(false);
        console.error("Error adding document: ", error);
        alert('Error submitting form');
    }
};

return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
            
            {/* <TextInput
                value={lon}
                style={styles.input}
                placeholder="Lon"
                onChangeText={(text) => setLon(text)}
            />
            <TextInput
                value={lat}
                style={styles.input}
                placeholder="Lat"
                onChangeText={(text) => setLat(text)}
            /> */}
            <View>
                <TextInput
                  value={issue}
                  style={styles.input}
                  placeholder="What Issue"
                  autoCapitalize="none"
                  onChangeText={(text) => setIssue(text)}
                />
            </View>
            <Divider style={{ backgroundColor: '#555555', marginVertical: 10 }} />
            <TextInput
                  value={danger}
                  style={styles.input}
                  placeholder="Describe Danger"
                  onChangeText={(text) => setDanger(text)}
              />
            <Slider
                style={{ width: 400, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                onValueChange={(value) => setDangerIndex(value)}
                thumbTintColor="blue"
              />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>Priority: {dangerIndex}</Text>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button title="Submit Form" onPress={handleSubmit} />
                </>
            )}
        </KeyboardAvoidingView>
    </View>
);
};

export default FormScreen;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    largeText: {
      fontSize: 24, // Increase this value to make the text larger
    },
  
});
