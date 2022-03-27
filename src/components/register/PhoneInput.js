import React from 'react';
import PhoneInput from 'react-native-phone-input';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useField } from '@formiz/core';
import CountryPicker from 'react-native-country-picker-modal'

const PhoneInputComp = (props) => {
    const phone = React.useRef(null);
    const modal = React.useRef(null);
    const { value, setValue } = useField(props);
    const openCountriesModal = () => {
        try {
            console.log(withFilter);
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        console.log(modal);
    }, [modal])

    return (
        <View style={tw`flex w-full justify-center items-center mt-30`}>
            <Text style={tw`w-3/4 text-slate-600 text-lg mb-3`}>
                Nomor telepon
            </Text>
            <PhoneInput
                style={tw`w-3/4 bg-white px-3 py-5 rounded`}
                autoFormat
                accessibilityLabel='testing'
                textStyle={{ fontSize: 18, fontWeight: '500' }}
                ref={phone}
                onChangePhoneNumber={(e) => setValue(phone.current.getValue())}
                initialCountry={'id'}
                textProps={{
                    placeholder: 'Enter a phone number...'
                }}
            />

        </View>
    );
}

export default PhoneInputComp;