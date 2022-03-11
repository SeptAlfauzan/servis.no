import React from 'react';
import { Text } from 'react-native';
import * as Location from 'expo-location';
import ServicesLocation from './ServicesLocation';
import SwipeUpDrawer from '../components/swipeupDrawer';

export default function Map() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    React.useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            status !== 'granted' && setErrorMsg('Location permission is denied!');

            const getLocation = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            });

            setLocation(getLocation);
            console.log('location', getLocation);
        })();
    }, []);

    return (
        <>
            {location == null && <Text>get location</Text>}
            {location && <ServicesLocation lat={location.coords.latitude} lng={location.coords.longitude} />
            }
        </>
    );
}