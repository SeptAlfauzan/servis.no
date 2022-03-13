import React from 'react';
import LottieView from 'lottie-react-native';

export default function Lotties({ filePath }) {
    return (
        <>
            <LottieView source={filePath} autoPlay loop />
        </>
    );
}