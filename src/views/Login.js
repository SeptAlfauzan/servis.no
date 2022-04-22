import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';
import axios from 'axios';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import NotifToken from '../utils/NotifToken';

export default function Login({ navigation }) {
    const [peek, setPeek] = React.useState(false);
    const [errorLogin, setErrorLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const formik = React.useRef(null);
    const handlePeekPassword = () => setPeek(!peek);

    const handleLogin = async (data) => {
        setLoading(true);
        setErrorLogin(null);
        try {
            console.log(API_URL)
            const response = await axios.post(`${API_URL}api/auth`, data).then(data => {
                setLoading(false);
                return data;
            });
            await AsyncStorage.setItem('@authorized', response.data.message);

            const jwtToken = await axios.post(`${API_URL}api/auth/token`, { username: data.username });
            const jwtData = jwtToken.data;
            await AsyncStorage.setItem('@username', jwtData.username);
            await AsyncStorage.setItem('@access-token', jwtData['access-token']);
            //insert notif token to DB            
            const notifToken = await AsyncStorage.getItem('@notif-token');
            const insertToken = await NotifToken.insertToken(jwtData.username, notifToken);
            //check if user is also patner
            const responseCheckIsPatner = await axios.get(`https://servisno.herokuapp.com/api/patners/one/${data.username}`,
                {
                    headers: {
                        'authorization': jwtData['access-token']
                    }
                }
            )
            responseCheckIsPatner.data.data ? await AsyncStorage.setItem('@is-patner', 'yes') : null;
            // reset form
            setPeek(false);
            Keyboard.dismiss();
            formik.current.resetForm();

            navigation.navigate('Dashboard', {
                isPatner: responseCheckIsPatner.data.data
            });
        } catch (error) {
            console.log(error);
            setErrorLogin(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <View style={tw`flex flex-col w-full h-full pt-30 pb-10 justify-between items-center`}>
            {/* form */}
            <View style={tw`w-3/4`}>
                <Formik
                    validateOnBlur={false}
                    innerRef={formik}
                    validationSchema={LoginSchema}
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={(values) => {
                        // same shape as initial values
                        console.log(values);
                        handleLogin(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            {errorLogin && (
                                <View
                                    style={tw`border border-red-400 rounded-lg w-full absolute`}

                                >
                                    <Text style={tw`relative px-5 py-4 text-red-400 text-center`}>
                                        Login fail. {errorLogin}
                                    </Text>
                                </View>
                            )}
                            <Text style={tw`text-2xl relative mb-8 mt-20`}>
                                Silahkan Login
                            </Text>

                            <Text style={tw`mb-2 mt-3 text-slate-500`}>Username</Text>
                            {errors.username && touched.username ? <Text style={tw`text-red-400`}>{errors.username}</Text> : null}
                            <TextInput
                                name="username"
                                placeholder='username'
                                style={tw`border  ${errors.username && touched.username ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3 h-10`}
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                value={values.username}
                            />

                            <Text style={tw` mt-3 text-slate-500`}>Password</Text>
                            {errors.password && touched.password ? <Text style={tw`text-red-400`}>{errors.password}</Text> : null}
                            <View style={tw`relative w-full`}>
                                <TextInput
                                    name="password"
                                    placeholder='password'
                                    style={tw`border  ${errors.password && touched.password ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3 h-10`}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                    secureTextEntry={!peek} />
                                <TouchableOpacity style={tw`absolute right-5 `} onPress={handlePeekPassword}>
                                    <Entypo name={peek ? 'eye-with-line' : 'eye'} size={20} color="black" style={tw`py-3`} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('PushNotif')}>
                                <Text style={tw`text-purple-500 text-right py-3 font-bold`}>Lupa password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`bg-slate-500 mt-5 rounded w-full`} onPress={handleSubmit}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#ffffff" />
                                ) : (
                                    <Text style={tw`text-white text-lg text-center py-3`}>Login</Text>
                                )}
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
            <View style={tw`flex flex-row w-3/4 justify-between`}>
                <Text>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={tw`text-purple-500 text-right font-bold`}>Registrasi sekarang.</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Terlalu pendek!')
        .max(50, 'Terlalu panjang!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Terlalu pendek!')
        .required('Required'),
});