import React from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import ServicesLocation from './ServicesLocation';
import LottieView from 'lottie-react-native';

export default function Map({ navigation }) {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const loadingAnim = './../../assets/lotties/loading-mapview.json';

    React.useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            status !== 'granted' && setErrorMsg('Location permission is denied!');
            const getLocation = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            });
            console.log(await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            }))

            setTimeout(() => {//set additional interval for loading animation
                setLocation(getLocation);
            }, 500);

            console.log('location', getLocation);
        })();
    }, []);

    return (
        <>
            {location == null &&
                <LottieView source={require(loadingAnim)} autoPlay loop />
            }
            {location && <ServicesLocation lat={location.coords.latitude} lng={location.coords.longitude} navigation={navigation} />
            }
        </>
    );
}