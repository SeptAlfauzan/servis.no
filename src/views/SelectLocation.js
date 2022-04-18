import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import ServicesLocation from './ServicesLocation';
import LottieView from 'lottie-react-native';
import MapStyles from '../utils/mapStyle';
import MapView, { Callout, Marker } from 'react-native-maps';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { GEOCODE_KEY } from 'react-native-dotenv';
const { width, height } = Dimensions.get('window');

export default function Map({ navigation }) {
    const [location, setLocation] = React.useState(null);
    const [locationDetail, setLocationDetail] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const loadingAnim = './../../assets/lotties/loading-mapview.json';

    const LATITUDE_DELTA = 0.0028;//for zoom level, lesser mean more depth zoom
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    const mapStyle = MapStyles.default();

    const reverseGeocode = async (location) => {
        try {
            const options = {
                method: 'GET',
                url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                params: { location: `${location.coords.latitude}, ${location.coords.longitude}`, language: 'en' },
                headers: {
                    'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com',
                    'X-RapidAPI-Key': GEOCODE_KEY
                }
            };
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (e) => {
        const { coordinate } = e.nativeEvent;
        setLocation({ coords: coordinate });
    }

    React.useEffect(async () => {
        try {
            const res = await reverseGeocode(location);
            const result = res.results.filter(data => data.location_type == "approximate");
            // console.log(result);
            setLocationDetail(result[0]);
        } catch (error) {
            console.log(error.message);
        }
    }, [location])

    React.useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            status !== 'granted' && setErrorMsg('Location permission is denied!');

            const getLocation = await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            });

            await Location.getCurrentPositionAsync({
                enableHighAccuracy: true
            })

            setTimeout(() => {//set additional interval for loading animation
                setLocation(getLocation);
            }, 500);

        })();
    }, []);

    return (
        <>
            {location == null &&
                <LottieView source={require(loadingAnim)} autoPlay loop />
            }
            {location && (
                <View style={tw`w-full h-full`}>
                    <TouchableOpacity style={tw`bg-white pl-2 rounded-full absolute top-10 left-10 z-10 w-10 h-10 flex items-center justify-center`}
                        onPress={() => navigation.pop()}
                    >

                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    </TouchableOpacity>



                    <View style={tw`absolute bg-slate-50 w-90 min-h-30 rounded-lg self-center bottom-10  z-10 px-5 py-4`}>
                        <Text style={tw`text-slate-300 mb-4`}>Lokasi anda saat ini</Text>
                        <Text style={tw`text-slate-500 mb-4`}>
                            {locationDetail ? locationDetail.address : 'Lokasi anda saat ini'}
                        </Text>
                        <TouchableOpacity
                            style={tw`ml-auto bg-purple-600 py-3 px-4 rounded-lg`}
                            onPress={() => navigation.navigate('RegisterPatner', { locationDetail })}
                        >
                            <Text>Pilih Lokasi</Text>
                        </TouchableOpacity>
                    </View>

                    <MapView
                        style={tw`w-full h-full`}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        onPress={data => handleChange(data)}
                        customMapStyle={mapStyle}
                        onRegionChangeComplete={null}
                    >
                        {/* current position marker */}
                        <Marker
                            key={1}
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            onPress={e => console.log('Your current position')}
                        >
                            {/* on tap on marker */}
                            <Callout style={styles.plainView}>
                                <View>
                                    <Text>{locationDetail ? locationDetail.address : 'Lokasi anda saat ini'}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    </MapView>
                </View>

            )
            }
        </>
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});