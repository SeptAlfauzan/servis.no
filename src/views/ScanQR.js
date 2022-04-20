import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import tw from 'twrnc';
import { useIsFocused } from '@react-navigation/native'

export default function ScanQR({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const [isFocused, setIsFocused] = React.useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        return () => {
            setIsFocused(false);
        }
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={tw`absolute z-10 bg-white w-14 h-14 p-2 rounded-full flex justify-center items-center top-14 left-8`}
                onPress={() => navigation.pop()}
            >
                <Text>back</Text>
            </TouchableOpacity>

            <View
                style={tw`absolute z-10 w-60 h-60 border-4 border-white rounded-xl self-center`}
            >
                <Text style={tw`text-xl text-white text-center -top-10`}>Scan Here</Text>
            </View>
            {/* {isFocused && (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={tw`absolute h-full w-full`}
                />
            )} */}

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});