import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import HeaderNav from '../components/HeaderNav';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';

export default function MakeOrder({ navigation, route }) {
    const [username, setUsername] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [patner_id, setPatner_id] = React.useState(null);

    React.useEffect(async () => {
        try {
            const getusername = await AsyncStorage.getItem('@username');
            setUsername(getusername);

            const token = await AsyncStorage.getItem('@access-token');
            const { data } = await axios.get(`${API_URL}api/users/user/${getusername}`,
                {
                    headers: {
                        'authorization': token
                    }
                }
            ).then(data => {
                return data;
            });
            setPatner_id(route.params.patner_id)
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const placeOrder = async (data) => {
        try {
            const res = await axios.post(`${API_URL}api/orders`, data);
            console.log('res status', res.status, 'req data', res.data);
        } catch (error) {
            console.log(error.message)
            Alert(error.message);
        }
    }

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Buat Order" navigation={navigation} />
            <Formik
                initialValues={{
                    gadget: '',
                    complaint: '',
                }}
                validationSchema={EditSchema}
                onSubmit={values => {
                    // same shape as initial values
                    const { complaint, gadget } = values;
                    const data = {
                        user_id: user.id,
                        complaint,
                        gadget,
                        patner_id,
                    }
                    console.log(data)
                    placeOrder(data).then(data => {
                        navigation.navigate('SuccessScreen', {
                            text: 'Anda sukses membuat order baru',
                            view: 'Dashboard'
                        })
                    })
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <ScrollView style={tw`h-full w-full`}>
                            <View style={tw`mt-25 mb-20 flex items-center`}>
                                <View style={tw`w-full px-8`}>
                                    <Input
                                        errors={errors.gadget}
                                        touched={touched.gadget}
                                        values={values.gadget}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        name="gadget"
                                        label="Kategori Gadget" />
                                    <Input
                                        errors={errors.complaint}
                                        touched={touched.complaint}
                                        values={values.complaint}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        name="complaint"
                                        style={tw`h-40`}
                                        label="Deskripsi Kerusakan" />
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity
                            disabled={user ? false : true}
                            style={tw`absolute bg-purple-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={handleSubmit} >
                            <Text style={tw`text-white text-lg text-center ml-3`}>Buat Order</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const Input = ({ label, errors, touched, values, name, handleChange, handleBlur, type, style }) => {
    return (
        <>
            <Text style={tw`mb-2 mt-3 text-slate-500`}>{label}</Text>
            {errors && touched ? <Text style={tw`text-red-400`}>{errors}</Text> : null}
            <TextInput
                name={name}
                {...type == "password" ? { secureTextEntry: true } : null}
                {...type == "email" ? { keyboardType: 'email-address' } : null}
                multiline
                style={[tw`border  ${errors && touched ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3`, style]}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={values}
            />
        </>
    );
}

const EditSchema = Yup.object().shape({
    gadget: Yup.string()
        .min(2, 'Terlalu pendek!')
        .max(50, 'Terlalu panjang!')
        .required('Required'),
    complaint: Yup.string()
        .min(2, 'Terlalu pendek!')
        .required('Required'),
});
