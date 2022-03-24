import * as React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import tw from 'twrnc';
import MapStyles from '../utils/mapStyle';
import DummyData from '../utils/dummyData';
import SwipeUpDrawer from '../components/swipeupDrawer';
import CustomMarker from '../components/mapMarker';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ServicesLocation({ lat, lng }) {
    const [patners, setPatners] = React.useState(null);
    const [unfilterPatners, setUnfilterPatners] = React.useState(null);
    // DELETE THIS
    const [details, setDetails] = React.useState(null);

    const { width, height } = Dimensions.get('window');
    const LATITUDE_DELTA = 0.0028;//for zoom level, lesser mean more depth zoom
    const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
    const mapStyle = MapStyles.default();

    React.useEffect(async () => {
        const data = await DummyData.getData(lat, lng);
        setPatners(JSON.parse(data));
        setUnfilterPatners(patners);
    }, []);

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

        <SwipeUpDrawer placeholderText={'Pilih tempat servis'} data={details}>
            <View style={[styles.container, tw`flex min-h-full w-full relative`]}>
                {/* filter component */}
                <View style={tw`bg-white rounded px-5 mt-5 flex`}>
                    <TouchableOpacity style={tw`bg-blue-300 text-white px-10`} onPress={() => handleFilter(1)}>
                        <Text>Testing Filter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`bg-blue-300 text-white px-10`} onPress={resetFilter}>
                        <Text>Reset Filter</Text>
                    </TouchableOpacity>
                </View>
                {/* end of filter component */}
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
                            <CustomMarker data={data} placename={data.name} latitude={data.latitude} longitude={data.longitude} handleClick={handleMakersClick} />
                        </View>
                    )
                    )}
                </MapView>

            </View>
        </SwipeUpDrawer>
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
