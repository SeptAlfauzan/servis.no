import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { View, Text } from 'react-native';
function MapMarker({ latitude, longitude, handleClick, placename, data }) {
    return (
        <Marker
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
            tracksViewChanges={false}
            onPress={e => handleClick(data)}
        >
            {/* on tap on marker */}
            <Callout onPress={e => console.log('e')}>
                <View>
                    <Text>Location one</Text>
                </View>
            </Callout>
        </Marker>
    )
}

export default CustomMarker = React.memo(MapMarker);