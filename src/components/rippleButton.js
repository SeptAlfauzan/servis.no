import { TouchableNativeFeedback, View, Text } from "react-native";

export default function RippleButton({ children, rippleColor, overflow, style, onPress }) {
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(rippleColor, overflow)}
            onPress={onPress}
        >
            <View style={style}>
                {children}
            </View>
        </TouchableNativeFeedback>
    );
}