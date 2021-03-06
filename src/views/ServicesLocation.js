import * as React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, FlatList } from 'react-native';
import tw from 'twrnc';
import MapStyles from '../utils/mapStyle';
import DummyData from '../utils/dummyData';
import SwipeUpDrawer from '../components/swipeupDrawer';
import CustomMarker from '../components/mapMarker';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as Harvesine from 'haversine';

const height = Dimensions.get('screen').height;


const PlaceLabel = ({ data, index, mapRef, lngDelta, latDelta, setDetails }) => {
    const handlePressLabel = (data) => {
        const { lat, lng } = data;
        console.log(lat, lng);

        setDetails(data)

        mapRef.current.animateToRegion({
            latitude: Number(lat),
            longitude: Number(lng),
            latitudeDelta: latDelta,
            longitudeDelta: lngDelta
        })
    }

    return (
        <TouchableOpacity
            onPress={() => handlePressLabel(data, mapRef)}
            key={index}
            style={tw`bg-slate-50 px-4 py-2 ml-4 rounded-full`}
        >
            <Text>{data.name}</Text>
            <Text>Jarak {Number(data.distance).toFixed(2)} meter</Text>
        </TouchableOpacity>
    )
}

export default function ServicesLocation({ lat, lng, navigation }) {
    const [patners, setPatners] = React.useState(null);
    const [unfilterPatners, setUnfilterPatners] = React.useState(null);
    // DELETE THIS
    const [details, setDetails] = React.useState(null);

    const { width, height } = Dimensions.get('window');
    const LATITUDE_DELTA = 0.0028;//for zoom level, lesser mean more depth zoom
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    const mapStyle = MapStyles.default();

    const mapRef = React.useRef(null);

    React.useEffect(async () => {
        try {
            const { data } = await axios.get('https://servisno.herokuapp.com/api/patners');

            const dataWithDistance = data.data.map(data => {
                // console.log(parseFloat(data.lat), parseFloat(data.lng))
                data.distance = Harvesine.default({
                    // start
                    latitude: lat,
                    longitude: lng
                }, {
                    // end
                    latitude: Number(data.lat),
                    longitude: Number(data.lng),
                }, { unit: 'meter' });
                return data;
            });
            setPatners(dataWithDistance);

        } catch (error) {
            Alert(error.message);
        }
    }, []);

    React.useEffect(() => {
        console.log(patners);
    }, [patners])

    const handleMakersClick = (arg) => {
        setDetails(arg);
    }

    const handleRegionChange = (region) => {
        console.log('region', region);
    }
    const handleFilter = (arg) => {
        const filtered = patners.filter(data => {
            return data.star == 1
        });
        setPatners(filtered)
    }
    const resetFilter = () => setPatners(unfilterPatners);
    return (

        <SwipeUpDrawer placeholderText={'Pilih tempat servis'} data={details} navigation={navigation}>


            <View style={[styles.container, tw`flex min-h-full w-full relative`]}>
                {/* filter component */}
                {/* list servis */}
                <View style={tw`absolute flex top-25 z-10`}>
                    <Text style={tw`text-slate-700 ml-8 mb-5`}>Daftar tempat servis</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={
                            Platform.OS !== 'android' &&
                            (({ highlighted }) => (
                                <View
                                    style={[
                                        style.separator,
                                        highlighted && { marginLeft: 0 }
                                    ]}
                                />
                            ))
                        }
                        data={patners}
                        renderItem={({ item, index, separators }) => (
                            // <PlaceLabel data={item} index={index} />
                            <PlaceLabel data={item} index={index} mapRef={mapRef} latDelta={LATITUDE_DELTA} lngDelta={LONGITUDE_DELTA} setDetails={setDetails} />
                        )}
                    />
                </View>

                <TouchableOpacity style={tw`bg-white pl-2 rounded-full absolute top-10 left-10 z-10 w-10 h-10 flex items-center justify-center`}
                    onPress={() => navigation.pop()}
                >
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                {/* end of filter component */}
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    customMapStyle={mapStyle}
                    onRegionChangeComplete={handleRegionChange}
                >
                    {/* current position marker */}
                    <Marker
                        key={1}
                        coordinate={{
                            latitude: lat,
                            longitude: lng,
                        }}
                        onPress={e => console.log('Your current position')}
                    >
                        {/* on tap on marker */}
                        <Callout style={styles.plainView}>
                            <View>
                                <Text>Your current position</Text>
                            </View>
                        </Callout>
                    </Marker>

                    {patners && patners.map((data, index) => (
                        <View key={index}>
                            <CustomMarker data={data} placename={data.name} latitude={Number(data.lat)} longitude={Number(data.lng)} handleClick={handleMakersClick} />
                        </View>
                    )
                    )}
                </MapView>

            </View>
        </SwipeUpDrawer >
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
