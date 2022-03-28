import React from 'react';
import PhoneInput from 'react-native-phone-input';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { useField } from '@formiz/core';
import axios from 'axios';
import SearchableModal from '../SearchableModal';

const PhoneInputComp = (props) => {
    const phone = React.useRef(null);
    const modal = React.useRef(null);
    const [countries, setCountries] = React.useState({});
    const { value, setValue } = useField(props);
    const [selected, setSelected] = React.useState({});

    const openCountriesModal = () => {
        try {
            console.log(withFilter);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePress = (e) => {
        setSelected(e);
        console.log(e.code);
        phone.current.selectCountry(e.code.toLowerCase())
    }

    React.useEffect(async () => {
        try {
            const response = await axios.get('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json');
            setCountries(response.data);
            console.log('data', countries);
        } catch (error) {
            console.log(error);
        }
    }, [])

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
                onPressFlag={() => modal.current.toggleShow()}
                onChangePhoneNumber={(e) => setValue(phone.current.getValue())}
                initialCountry={'id'}
                textProps={{
                    placeholder: 'Enter a phone number...'
                }}
            />
            <SearchableModal ref={modal} data={countries} flags handlePress={handlePress} />
        </View>
    );
}

export default PhoneInputComp;