import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import HeaderNav from '../components/HeaderNav';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-input';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterPatner({ navigation, route }) {

    const { user } = route.params;

    React.useEffect(() => {
        console.log(user);
    }, [])

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Edit Akun" navigation={navigation} />
            <Formik
                initialValues={{
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    password: '',
                    phone: user.phone,
                    address: user.address,
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
                                <View style={tw`border border-purple-300 rounded-full p-1`}>
                                    <Image
                                        style={tw`w-10 h-10 rounded-full border`}
                                        source={{
                                            uri: `https://ui-avatars.com/api/?name=${user.name}&background=7868E6&color=fff`,
                                        }}
                                    />
                                </View>
                                <View style={tw`w-full px-8`}>
                                    <Input
                                        errors={errors.name}
                                        touched={touched.name}
                                        values={values.name}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        label="Nama"
                                        name="name" />
                                    <Input
                                        errors={errors.email}
                                        touched={touched.email}
                                        values={values.email}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        label="Email"
                                        type="email"
                                        name="email" />
                                    <Input
                                        errors={errors.password}
                                        touched={touched.password}
                                        values={values.password}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        type="password"
                                        label="Password"
                                        name="password" />
                                    <Input
                                        errors={errors.validate_password}
                                        touched={touched.validate_password}
                                        values={values.validate_password}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        type="password"
                                        label="Validasi Password"
                                        name="validate_password" />

                                    <Text style={tw`mb-2 mt-3 text-slate-500`}>Nomor Telepon</Text>
                                    {errors.phone && touched.phone ? <Text style={tw`text-red-400`}>{errors.phone}</Text> : null}
                                    <PhoneInput
                                        name="phone"
                                        style={tw`border  ${errors.phone && touched.phone ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3 py-2`}
                                        autoFormat
                                        accessibilityLabel='testing'
                                        textStyle={{ fontSize: 14, fontWeight: '600' }}
                                        onPressFlag={null}
                                        onChangePhoneNumber={handleChange('phone')}
                                        initialCountry={'id'}
                                        initialValue={`62${values.phone}`}
                                        textProps={{
                                            placeholder: 'Enter a phone number...'
                                        }}
                                    />

                                    <Input
                                        errors={errors.address}
                                        touched={touched.address}
                                        values={values.address}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        label="Alamat"
                                        name="address" />

                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={tw`absolute bg-purple-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={handleSubmit} >
                            <MaterialIcons name="edit" size={20} color="white" style={tw`mt-1`} />
                            <Text style={tw`text-white text-lg text-center ml-3`}>Simpan Edit</Text>
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
