// Formik x React Native example
import React from 'react';
import { Button, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import tw from 'twrnc';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'Terlalu pendek')
        .max(50, 'Terlalu panjang')
        .required('Field perlu diisi'),
    address: Yup.string()
        .min(10, 'Terlalu pendek')
        .max(100, 'Terlalu panjang')
        .required('Field perlu diisi'),
});

const FormPersonal = (props) => (
    <Formik
        initialValues={{ name: '', address: '' }}
        onSubmit={values => console.log(values)}
        validationSchema={Schema}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={tw`flex flex-col w-3/4`}>
                {errors.name && touched.name ? (
                    <Text style={tw`text-red-500`}>{errors.name}</Text>
                ) : null}
                <TextInput
                    placeholder='Nama'
                    style={tw`w-full border px-5 py-2 rounded mb-5 ${errors.name && touched.name ? ('border-red-500') : ('border-slate-500')}`}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                />
                {errors.address && touched.address ? (
                    <Text style={tw`text-red-500`}>{errors.address}</Text>
                ) : null}
                <TextInput
                    placeholder='Alamat'
                    style={tw`w-full border px-5 py-2 rounded mb-5 ${errors.address && touched.address ? ('border-red-500') : ('border-slate-500')}`}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
                />
                <Button onPress={handleSubmit} title="Submit" />
            </View>
        )}
    </Formik>
);

export default FormPersonal;