import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import HeaderNav from '../components/HeaderNav';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function MakeOrder({ navigation, route }) {

    const [image, setImage] = React.useState(null);

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
                    console.log(values);
                    navigation.navigate('SuccessScreen', {
                        text: 'Anda sukses membuat order baru',
                        view: 'Dashboard'
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
                        <TouchableOpacity style={tw`absolute bg-purple-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={handleSubmit} >
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
