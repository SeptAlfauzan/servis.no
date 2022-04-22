import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-input';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import HeaderNav from '../../components/HeaderNav';

export default function Confirm({ navigation, route }) {
    const data = route.params;

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Kofirmasi Pesanan" navigation={navigation} />
            <Formik
                initialValues={{
                    user_id: '',
                    patner_id: '',
                    order_id: '',
                    ammount: '',
                }}
                validationSchema={EditSchema}
                onSubmit={values => {
                    // same shape as initial values
                    console.log(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <ScrollView style={tw`h-full w-full`}>
                            <View style={tw`mt-25 mb-20 flex items-center`}>

                                <View style={tw`w-full px-8`}>
                                    <Text
                                        style={tw`font-bold text-lg`}
                                    >
                                        Pelanggan
                                    </Text>
                                    <View
                                        style={tw`rounded-lg bg-slate-100 w-full p-4 my-3`}
                                    >
                                        <View style={tw`flex-row mt-2 w-full justify-between`}>
                                            <Text style={tw`text-slate-300`}>Nama</Text>
                                            <Text>Nama</Text>
                                        </View>
                                        <View style={tw`flex-row mt-2 w-full justify-between`}>
                                            <Text style={tw`text-slate-300`}>Alamat</Text>
                                            <Text>Alamat</Text>
                                        </View>
                                        <View style={tw`flex-row mt-2 w-full justify-between`}>
                                            <Text style={tw`text-slate-300`}>Nomor Telp.</Text>
                                            <Text>Nomor Telp.</Text>
                                        </View>
                                    </View>


                                    <Text
                                        style={tw`font-bold text-lg`}
                                    >
                                        Detail Pesanan
                                    </Text>
                                    <View
                                        style={tw`rounded-lg bg-slate-100 w-full p-4 my-3`}
                                    >
                                        <View style={tw`flex-row mt-2 w-full justify-between`}>
                                            <Text style={tw`text-slate-300`}>Gadget</Text>
                                            <Text>{data.gadget}</Text>
                                        </View>
                                        <View style={tw`flex-row mt-2 w-full justify-between relative`}>
                                            <Text style={tw`text-slate-300 text-right`}>Keluhan</Text>
                                            <Text style={tw`flex-1 flex-wrap text-right`}>{data.complaint} {data.complaint} {data.complaint} {data.complaint}</Text>
                                        </View>
                                        <View style={tw`flex-row mt-2 w-full justify-between`}>
                                            <Text style={tw`text-slate-300`}>Nomor Telp.</Text>
                                            <Text>Nomor Telp.</Text>
                                        </View>
                                    </View>

                                    <Input
                                        errors={errors.ammount}
                                        touched={touched.ammount}
                                        values={values.ammount}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        type="number"
                                        label="Biaya jasa"
                                        name="ammount" />
                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={tw`absolute bg-red-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={null} >
                            <Text style={tw`text-white text-lg text-center ml-3`}>Batalkan Order</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`absolute bg-purple-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={handleSubmit} >
                            <Text style={tw`text-white text-lg text-center ml-3`}>Konfirmasi Order</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const Input = ({ label, errors, touched, values, name, handleChange, handleBlur, type }) => {
    return (
        <>
            <Text style={tw`mb-2 mt-3 text-slate-500`}>{label}</Text>
            {errors && touched ? <Text style={tw`text-red-400`}>{errors}</Text> : null}
            <TextInput
                name={name}
                {...type == "password" ? { secureTextEntry: true } : null}
                {...type == "email" ? { keyboardType: 'email-address' } : null}
                {...type == "number" ? { keyboardType: 'number-pad' } : null}
                style={tw`border  ${errors && touched ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3`}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={values}
            />
        </>
    );
}

const EditSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Terlalu pendek!')
        .max(50, 'Terlalu panjang!')
        .required('Required'),
    username: Yup.string()
        .min(2, 'Terlalu pendek!')
        .max(50, 'Terlalu panjang!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Terlalu pendek!')
        .required('Required'),
    validate_password: Yup.string()
        .min(8, 'Terlalu pendek!')
        .required('Required'),
    phone: Yup.string()
        .required('Required'),
    address: Yup.string()
        .min(8, 'Terlalu pendek!')
        .required('Required'),
});
