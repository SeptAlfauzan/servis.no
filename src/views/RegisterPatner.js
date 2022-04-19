import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView, ActivityIndicator, Alert } from 'react-native';
import tw from 'twrnc';
import HeaderNav from '../components/HeaderNav';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-native-phone-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
    },
}

export default function RegisterPatner({ navigation, route }) {

    const [image, setImage] = React.useState(null);
    const [location, setLocation] = React.useState(null);
    const [imageData, setImageData] = React.useState(null);
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        try {
            const { locationDetail } = route.params;
            console.log('location.address', locationDetail)
            setLocation(locationDetail);
        } catch (error) {
            console.log(error.message)
        }
    }, [route.params])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync();
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri);
            setImageData(result);
        }
    };

    const openGallery = async () => {
        const result = await launchImageLibrary(options);
        console.log(result)
    }

    const createFormData = (photo, body = {}) => {
        const data = new FormData();

        data.append('photo', {
            name: photo.fileName,
            type: photo.type,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });

        return data;
    };

    const handleFormSubmit = async (data) => {
        const { name, email, address, password, phone, lat, lng } = data;
        setLoading(true);
        const formData = new FormData();
        try {
            formData.append('name', name);
            formData.append('username', await AsyncStorage.getItem('@username'));
            formData.append('address', address);
            formData.append('lat', lat);
            formData.append('lng', lng);
            formData.append('password', '-');
            formData.append('phone', phone);
            formData.append('photo',
                {
                    name: imageData.fileName || imageData.uri.substr(imageData.uri.lastIndexOf('/') + 1),
                    uri: image,
                    type: 'image/jpeg'
                });
            console.log(formData);
            // const config = {
            //     headers: {
            //         'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
            //     },
            // };
            fetch('https://servisno.herokuapp.com/api/patners', {
                method: "POST",
                body: formData
            }).then(response => {
                setLoading(false);
                navigation.navigate('SuccessScreen', {
                    text: 'Anda terdaftar sebagai mitra',
                    view: 'Dashboard'
                })
            }).catch(error => Alert(error.message));
            console.log('berhasil')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Gabung Mitra" navigation={navigation} backto="AccountProfile" />
            <Formik
                enableReinitialize
                initialValues={{
                    name: '-',
                    username: 'asd-',
                    email: 'alfauzansepta@gmail.com',
                    photo: '-',
                    password: '12345678',
                    phone: '0',
                    address: location ? location.address : '',
                    lat: location ? location.location.lat : '',
                    lng: location ? location.location.lng : '',
                }}
                validationSchema={EditSchema}
                onSubmit={values => {
                    // values.address = location ? location.address : values.address;
                    // values.lat = location ? location.location.lat : values.lat;
                    // values.lng = location ? location.location.lng : values.lng;
                    // same shape as initial values
                    console.log('onsubmit', values)
                    handleFormSubmit(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <ScrollView style={tw`h-full w-full`}>
                            <View style={tw`mt-25 mb-20 flex items-center`}>
                                <Text style={tw`ml-8 mb-3 self-start text-lg`}>Lengkapi Data Berikut.</Text>

                                {errors.photo && !image ? <Text style={tw`text-red-400`}>{errors.photo}</Text> : null}
                                <TouchableOpacity onPress={pickImage} style={tw`w-5/6 bg-slate-300 rounded relative`}>
                                    {!image && (
                                        <MaterialCommunityIcons name="image-plus" size={80} style={tw`absolute self-center mt-10`} color="white" />
                                    )}
                                    <Image
                                        style={tw`w-full h-40`}
                                        source={{
                                            uri: image || null
                                        }}
                                    />
                                </TouchableOpacity>
                                {/* hidden image input */}
                                <TextInput
                                    name="photo"
                                    style={tw`hidden`}
                                    onBlur={handleBlur("photo")}
                                    onChangeText={handleChange("photo")}
                                    value={image}
                                />
                                <View style={tw`w-full px-8`}>
                                    <View style={tw`border border-slate-300 p-4 rounded-lg mt-3`}>

                                        <Input
                                            disable={true}
                                            errors={errors.address}
                                            touched={touched.address}
                                            values={location ? String(location.address) : null}
                                            style={tw`py-2`}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            label="Alamat"
                                            name="address" />
                                        <Input
                                            disable={true}
                                            errors={errors.lat}
                                            touched={touched.lat}
                                            values={location ? String(location.location.lat) : values.lat}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            label="Latitude"
                                            name="lat" />
                                        <Input
                                            disable={true}
                                            errors={errors.lng}
                                            touched={touched.lng}
                                            values={location ? String(location.location.lng) : values.lng}
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            label="Longitude"
                                            name="lng" />

                                        <TouchableOpacity style={tw`bg-slate-600 py-3 rounded-xl rounded-tr-xl flex-row justify-center py-2 px-2 ml-auto mt-2 items-center flex`} onPress={() => navigation.navigate('SelectLocation')} >
                                            <MaterialIcons name="location-pin" size={24} color="black" />
                                            <Text style={tw`text-white text-center ml-2`}>Pilih Lokasi</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Input
                                        errors={errors.name}
                                        touched={touched.name}
                                        values={values.name}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        label="Nama Tempat"
                                        name="name" />

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


                                </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={tw`absolute bg-purple-600  w-full py-3 bottom-0 rounded-tl-xl rounded-tr-xl flex-row justify-center`} disabled={loading} onPress={handleSubmit} >
                            {loading ? (
                                <ActivityIndicator size="large" color="#ffffff" />
                            ) : (
                                <>
                                    <MaterialIcons name="edit" size={20} color="white" style={tw`mt-1`} />
                                    <Text style={tw`text-white text-lg text-center ml-3`}>Gabung Mitra</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
}

const Input = ({ label, errors, touched, values, name, handleChange, handleBlur, type, disable, hidden, style }) => {
    return (
        <>
            <Text style={tw`mb-2 mt-3 text-slate-500  ${hidden ? 'hidden' : null}`}>{label}</Text>
            {errors && touched ? <Text style={tw`text-red-400`}>{errors}</Text> : null}
            <TextInput
                multiline
                {...disable ? { editable: false } : null}
                name={name}
                {...type == "password" ? { secureTextEntry: true } : null}
                {...type == "email" ? { keyboardType: 'email-address' } : null}
                style={[tw`border  ${errors && touched ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3 ${hidden ? 'hidden' : null}`, style]}
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
    photo: Yup.string()
        .nullable()
        .required('Perlu menambahkan Foto'),
    username: Yup.string()
        .min(2, 'Terlalu pendek!')
        .max(50, 'Terlalu panjang!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(8, 'Terlalu pendek!')
        .required('Required'),
    phone: Yup.string()
        .required('Required'),
    address: Yup.string()
        .required('Required'),
    lat: Yup.string()
        .required('Required'),
    lng: Yup.string()
        .required('Required'),
});
