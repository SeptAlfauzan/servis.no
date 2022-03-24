// Formik x React Native example
import React from 'react';
import { Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc';
import * as Yup from 'yup';

const Schema = (passwordVal) => Yup.object().shape({
    username: Yup.string()
        .min(4, 'Terlalu pendek')
        .max(50, 'Terlalu panjang')
        .required('Field perlu diisi'),
    password: Yup.string()
        .min(10, 'Terlalu pendek')
        .max(100, 'Terlalu panjang')
        .required('Field perlu diisi'),
    repassword: Yup.string()
        .min(10, 'Terlalu pendek')
        .max(100, 'Terlalu panjang')
        .required('Field perlu diisi')
        .oneOf([Yup.ref('password'), null], 'Password harus sama'),
});

const FormPersonal = (props) => {
    const [pswd, setPswd] = React.useState('');
    const [peekpswd, setPeekpswd] = React.useState(false);
    const [peekpswdConfrm, setPeekpswdConfrm] = React.useState(false);

    const handlePasswordPeek = (method, arg) => method(!arg);

    return (
        <Formik
            initialValues={{ username: '', password: '', repassword: '' }}
            onSubmit={values => console.log(values)}
            validationSchema={Schema}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={tw`flex flex-col w-3/4`}>
                    {errors.username && touched.username ? (
                        <Text style={tw`text-red-500`}>{errors.username}</Text>
                    ) : null}
                    <TextInput
                        placeholder='Nama'
                        style={tw`w-full border px-5 py-2 rounded mb-5 ${errors.username && touched.username ? ('border-red-500') : ('border-slate-500')}`}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    {errors.password && touched.password ? (
                        <Text style={tw`text-red-500`}>{errors.password}</Text>
                    ) : null}
                    <View style={tw`relative`}>
                        <TextInput
                            placeholder='Password'
                            style={tw`w-full border px-5 pr-12 py-2 rounded mb-5 ${errors.password && touched.password ? ('border-red-500') : ('border-slate-500')}`}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={!peekpswd}
                        />
                        <TouchableOpacity style={tw`absolute right-5 top-0 bottom-0`} onPress={() => handlePasswordPeek(setPeekpswd, peekpswd)}>
                            <Entypo name={peekpswd ? 'eye-with-line' : 'eye'} size={20} color="black" style={tw`py-3`} />
                        </TouchableOpacity>
                    </View>
                    {errors.repassword && touched.repassword ? (
                        <Text style={tw`text-red-500`}>{errors.repassword}</Text>
                    ) : null}
                    <View style={tw`relative`}>
                        <TextInput
                            placeholder='Repassword'
                            style={tw`w-full border px-5 py-2 pr-12 rounded mb-5 ${errors.repassword && touched.repassword ? ('border-red-500') : ('border-slate-500')}`}
                            onChangeText={handleChange('repassword')}
                            onBlur={handleBlur('repassword')}
                            value={values.repassword}
                            secureTextEntry={!peekpswdConfrm}
                        />
                        <TouchableOpacity style={tw`absolute right-5 top-0 bottom-0`} onPress={() => handlePasswordPeek(setPeekpswdConfrm, peekpswdConfrm)}>
                            <Entypo name={peekpswdConfrm ? 'eye-with-line' : 'eye'} size={20} color="black" style={tw`py-3`} />
                        </TouchableOpacity>
                    </View>
                    <Button onPress={handleSubmit} title="Submit" />
                </View>
            )}
        </Formik>
    );
}

export default FormPersonal;