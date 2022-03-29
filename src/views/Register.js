import React from 'react';
import { Button, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formiz, FormizStep, useForm, useField } from '@formiz/core'
import tw from 'twrnc';
import FormPhoneNumber from '../components/register/FormPhoneNumber.js';
import { isEmail, isMinLength, isMaxLength, isRequired, isPattern } from '@formiz/validations'
import MultiStepInput from '../components/formizTextInput';
import { Platform } from 'expo-modules-core';
import ProgressCheck from '../components/progressCheck.js';
import PhoneInputComp from '../components/register/PhoneInput.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PhoneInputNum = (props) => {
    const { setValue, value } = useField(props);
    return (
        <PhoneInputComp />
    );
}

export default function Register() {
    const myForm = useForm()
    const [currentStep, setCurrentStep] = React.useState(1);
    const [password, setPassword] = React.useState(null);

    React.useEffect(() => {
        setPassword(myForm.values.password);
    }, [myForm.values.password])

    const handleSubmit = async () => {
        console.log(myForm.values);
        const { email, username } = myForm.values;
        // REFACTOR PLEASE
        try {
            const getResponse = await axios.get(`http://192.168.1.5:8000/api/users/user/${email}/${username}`)
            const { verificationCode } = getResponse.data.user;
            await AsyncStorage.setItem('@verificationCode', toString(verificationCode));
            await AsyncStorage.setItem('@emailVerication', toString(email));
        } catch (error) {
            console.log(error.response.data);
        }
        try {
            const response = await axios.post('http://192.168.1.5:8000/api/register', myForm.values);
            console.log(response.data.message);
            // const getResponse = await axios.get('http://192.168.1.11:8000/api/users');
        } catch (error) {
            console.log(error.message);
        }
    }

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
        Keyboard.dismiss();
        myForm.nextStep();
    }

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        Keyboard.dismiss();
        myForm.prevStep();
    }

    return (
        <Formiz
            connect={myForm}
            onValidSubmit={handleSubmit}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={tw`flex pt-8`}
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
                            rule: isMinLength(8),
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
                        style={tw`bg-slate-200 px-5 py-2 rounded-full`}
                    >
                        <Text>Kembali</Text>
                    </TouchableOpacity>
                )}
                {myForm.isLastStep ? (
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={tw`bg-slate-200 px-5 py-2 rounded-full`}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity disabled={!myForm.isValid} style={tw`px-10 py-2 rounded-full ml-auto ${myForm.isValid ? 'bg-purple-600' : 'bg-slate-300'}`} onPress={nextStep}>
                        <Text style={tw`text-white`}>
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