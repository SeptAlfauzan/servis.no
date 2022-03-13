import * as React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import tw from 'twrnc';
import MapStyles from '../utils/mapStyle';
import DummyData from '../utils/dummyData';
import SwipeUpDrawer from '../components/swipeupDrawer';

export default function ServicesLocation({ lat, lng }) {
    const [patners, setPatners] = React.useState(null);
    // DELETE THIS
    const [details, setDetails] = React.useState(null);

    const { width, height } = Dimensions.get('window');
    const LATITUDE_DELTA = 0.0028;//for zoom level, lesser mean more depth zoom
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    const mapStyle = MapStyles.default();

    React.useEffect(async () => {
        const data = await DummyData.getData(lat, lng);
        setPatners(JSON.parse(data));
    }, []);

    const handleMakersClick = (arg) => {
        setDetails(arg);
    }
    const handleRegionChange = (region) => {
        console.log('region', region);
    }
    return (
        <View style={[styles.container, tw`absolute flex min-h-full w-full`]}>
            <MapView
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
                    onPress={e => handleMakersClick('position 1')}
                >
                    {/* on tap on marker */}
                    <Callout style={styles.plainView}>
                        <View>
                            <Text>Your current position</Text>
                        </View>
                    </Callout>
                </Marker>
                {patners && patners.map(data => (
                    <Marker
                        key={data.key}
                        coordinate={{
                            latitude: data.latitude,
                            longitude: data.longitude,
                        }}
                        onPress={e => handleMakersClick(`position ${data.key}`)}
                    >
                        {/* on tap on marker */}
                        <Callout style={styles.plainView} onPress={e => console.log('e')}>
                            <View>
                                <Text>Location one</Text>
                            </View>
                        </Callout>
                    </Marker>
                )
                )}
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
