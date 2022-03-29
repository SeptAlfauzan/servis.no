import { Button, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function Box() {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: offset.value * 255 }],
        };
    });

    return (
        <>
            <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyles]} />
            <Button
                onPress={() => {
                    offset.value = withSpring(Math.random() * 10);
                }}
                title="Move"
            />
        </>
    );
}