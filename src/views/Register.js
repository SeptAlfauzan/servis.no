import React from 'react';
import { Button, View, TextInput, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formiz, FormizStep, useForm, useField } from '@formiz/core'
import tw from 'twrnc';
import FormPhoneNumber from '../components/register/FormPhoneNumber.js';
import { isEmail, isMinLength, isMaxLength, isRequired } from '@formiz/validations'
import MultiStepInput from '../components/formizTextInput';
import { Platform } from 'expo-modules-core';
import ProgressCheck from '../components/progressCheck.js';


const Inputan = (props) => {
    const { setValue, value } = useField(props);
    return (
        <TextInput placeholder='input pertama' onChangeText={e => setValue(e)} value={value ?? ''} style={{ height: 100 }} />)
}

export default function Register() {
    const myForm = useForm()
    const [currentStep, setCurrentStep] = React.useState(1);

    const handleSubmit = () => {
        console.log(myForm.values)
    }
    const nextStep = () => {
        setCurrentStep(currentStep + 1);
        myForm.nextStep();
    }
    const prevStep = () => {
        setCurrentStep(currentStep - 1);
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
                <ProgressCheck length={3} active={currentStep} />
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
                        placeholder="Password"
                        validations={[
                            {
                                rule: isMinLength(8),
                                message: 'Password terlalu pendek!'
                            },
                        ]}
                    />
                    <MultiStepInput
                        name="password"
                        placeholder="Password"
                        validations={[
                            {
                                rule: isMinLength(8),
                                message: 'Password terlalu pendek!'
                            },
                        ]}
                    />
                </FieldWrapper>
                <FormizStep as={View}
                    name="step4" // Split the form with FormizStep
                >
                    <TextInput style={{ height: 100 }} placeholder='input kedua' name="test" onChangeText={(e) => console.log(e)} />
                </FormizStep>

                {/* Update the submit button to allow navigation between steps. */}
            </KeyboardAvoidingView>
            <View style={tw`flex flex-row absolute justify-center bottom-5 w-full px-10`}>
                {!myForm.isFirstStep && (
                    <TouchableOpacity
                        onPress={prevStep}
                        style={tw`bg-slate-200 px-5 py-2 rounded-full`}
                    >
                        <Text>Kembali</Text>
                    </TouchableOpacity>
                )}
                {myForm.isLastStep ? (
                    <Button disabled={!myForm.isValid} title="submit" onPress={handleSubmit} />
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
            name={step} // Split the form with FormizStep
        >
            <View style={tw`flex h-3/4 w-full justify-center items-center`}>
                <View style={tw`flex flex-col w-3/4`}>
                    {children}
                </View>
            </View>
        </FormizStep>
    );
}