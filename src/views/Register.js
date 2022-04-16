import React from 'react';
import { Button, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, BackHandler, Dimensions, Alert } from 'react-native';
import { Formiz, FormizStep, useForm, useField } from '@formiz/core'
import tw from 'twrnc';
import { isEmail, isMinLength, isMaxLength, isRequired, isPattern } from '@formiz/validations'
import MultiStepInput from '../components/formizTextInput';
import { Platform } from 'expo-modules-core';
import ProgressCheck from '../components/progressCheck.js';
import PhoneInputComp from '../components/register/PhoneInput.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, API_REGISTER } from 'react-native-dotenv';

const PhoneInputNum = (props) => {
    const { setValue, value } = useField(props);
    return (
        <PhoneInputComp />
    );
}

const getTopSpacing = (arg) => Dimensions.get('screen').height * arg;

export default function Register({ navigation }) {
    const myForm = useForm()
    const [currentStep, setCurrentStep] = React.useState(1);
    const [password, setPassword] = React.useState(null);
    const [topSpacing, setTopSpacing] = React.useState(0);

    React.useEffect(() => {
        setTopSpacing(getTopSpacing(0.1));
        console.log(API_URL);
    }, [])
    React.useEffect(() => {
        setPassword(myForm.values.password);
    }, [myForm.values.password])

    const handleSubmit = async () => {
        const { name, username, password, address, email, phone } = myForm.values;
        const data = {
            name,
            username,
            password,
            address,
            email,
            phone,
        }
        console.log(data);
        // REFACTOR PLEASE
        try {
            const register = await axios.post(`${API_URL}api/register`, data);
            console.log('register', register);
            // get user data for verification
            if (register) {
                const getUser = await axios.get(`${API_URL
                    }api/users/user/${email}/${username}`)
                const { verificationCode } = getUser.data.user;

                await AsyncStorage.setItem('@verificationCode', `${verificationCode}`);
                await AsyncStorage.setItem('@emailVerication', `${email}`);
                await AsyncStorage.setItem('@username', `${username}`);
                setCurrentStep(1);
                myForm.reset();
                navigation.navigate('Verification')
            }
        } catch (error) {
            console.log(error.response.data.message);
            Alert(error.response.data.message);
        }

    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
        Keyboard.dismiss();
        myForm.nextStep();
    }

    const prevStep = () => {
        if (currentStep === 1) navigation.pop();
        setCurrentStep(currentStep - 1);
        Keyboard.dismiss();
        myForm.prevStep();
        return true;
    }
    // KURANG CUSTOM BACK BUTTON
    // React.useEffect(
    //     () => {
    //         BackHandler.addEventListener('hardwareBackPress', prevStep)
    //     }, [currentStep]);
    // React.useEffect(() => {
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', prevStep);
    //     }
    // })

    return (
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={[tw`flex pt-8`, { top: topSpacing }]}
                keyboardVerticalOffset={5}
            >
                <ProgressCheck length={4} active={currentStep} />

                <FieldWrapper step={'step1'}>
                    <MultiStepInput name="name" placeholder="Nama" validations={[
                        {
                            rule: isRequired(),
                            message: 'Field nama perlu diisi!'
                        },
                        {
                            rule: isMinLength(8),
                            message: 'Nama terlalu pendek!'
                        },
                        {
                            rule: isMaxLength(50),
                            message: 'Nama terlalu panjang!'
                        },
                    ]} />
                    <MultiStepInput
                        name="address"
                        placeholder="Alamat"
                        validations={[
                            {
                                rule: isRequired(),
                                message: 'Field alamat perlu diisi!'
                            },
                            {
                                rule: isMinLength(8),
                                message: 'Alamat terlalu pendek!'
                            },
                            {
                                rule: isMaxLength(100),
                                message: 'Alamat terlalu panjang!'
                            },
                        ]}
                    />
                </FieldWrapper>

                <FieldWrapper step={'step2'}>
                    <MultiStepInput type="email-address" name="email" placeholder="Email" validations={[
                        {
                            rule: isEmail(),
                            message: 'Input bukan merupakan email'
                        },
                    ]} />
                    <MultiStepInput name="username" placeholder="Username" validations={[
                        {
                            rule: isMinLength(5),
                            message: 'Nama terlalu pendek!'
                        },
                        {
                            rule: isMaxLength(20),
                            message: 'Nama terlalu panjang!'
                        },
                    ]} />
                </FieldWrapper>

                <FieldWrapper step={'step3'}>
                    <MultiStepInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        validations={[
                            {
                                rule: isMinLength(8),
                                message: 'Password terlalu pendek!'
                            },
                        ]}
                    />
                    <MultiStepInput
                        name="password2"
                        type="password"
                        placeholder="Konfirmasi password"
                        validations={[
                            {
                                rule: isMinLength(8),
                                message: 'Password terlalu pendek!'
                            },
                            {
                                rule: isPattern(`^${password}$`),
                                message: 'Password harus sama'
                            },
                        ]}
                    />
                </FieldWrapper>

                <FormizStep as={View}
                    name="step4" // Split the form with FormizStep
                >
                    <PhoneInputComp name="phone" />
                </FormizStep>

                {/* Update the submit button to allow navigation between steps. */}
            </KeyboardAvoidingView>
            <View style={tw`flex flex-row absolute justify-center bottom-2 w-full px-10`}>
                {!myForm.isFirstStep && (
                    <TouchableOpacity
                        onPress={prevStep}
                        style={tw`bg-slate-200 px-5 py-2 rounded-full w-1/2`}
                    >
                        <Text style={tw`font-bold`}>Kembali</Text>
                    </TouchableOpacity>
                )}
                {myForm.isLastStep ? (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={tw`px-5 py-2 rounded-full w-1/2 ${myForm.isValid ? 'bg-purple-600 w-1/2' : 'bg-slate-300'}`}
                    >
                        <Text style={tw`font-bold text-white text-center`}>Register</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity disabled={!myForm.isValid} style={tw`px-10 py-2 rounded-full ml-auto ${myForm.isValid ? 'bg-purple-600 w-1/2' : 'bg-slate-300'}`} onPress={nextStep}>
                        <Text style={tw`text-white font-bold`}>
                            Selanjutnya
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </Formiz >
    )
}

const FieldWrapper = ({ children, step }) => {
    return (
        <FormizStep as={View}
            style={tw`flex`}
            name={step} // Split the form with FormizStep
        >
            <View style={tw`flex h-3/4 w-full justify-center items-center`}>
                <View style={tw`flex flex-col w-3/4 bottom-0`}>
                    {children}
                </View>
            </View>
        </FormizStep>
    );
}