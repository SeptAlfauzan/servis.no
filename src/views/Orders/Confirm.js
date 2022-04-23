import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HeaderNav from '../../components/HeaderNav';
import ModalProcessOrder from '../../ModalProcessOrder';
import axios from 'axios';

export default function Confirm({ navigation, route }) {
    const data = route.params;
    const modal = React.useRef(null);

    const handleCancel = async (id) => {
        try {
            const response = await axios.put(`https://servisno.herokuapp.com/api/orders?id=${id}`, {
                canceled: true
            });
            alert(`Order dibatalkan, anda akan dipindahkan ke halaman proses order`);
            navigation.navigate('ProcessOrder');
        } catch (error) {
            alert(error.message);
        }
    }
    const handleConfirm = async (id, data) => {
        try {
            const response = await axios.put(`https://servisno.herokuapp.com/api/orders?id=${id}`, {
                bill: data.ammount,
                confirm: true,
            });
            alert(`Tagihan untuk pesanan telah ditambahkan, silahkan menunggu konfirmasi pembayaran dari klien`);
            navigation.navigate('ProcessOrder');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Kofirmasi Pesanan" navigation={navigation} />
            <Formik
                initialValues={{
                    ammount: '',
                }}
                validationSchema={EditSchema}
                onSubmit={values => {
                    // same shape as initial values
                    handleConfirm(data.id, values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <ScrollView style={tw`h-full w-full`}>
                            <ModalProcessOrder ref={modal} submitStyle={tw`bg-red-600`} onSubmit={() => {
                                handleCancel(data.id);
                            }}>
                                <Text>Apakah anda yakin ingin membatalkan pesanan ini?</Text>
                            </ModalProcessOrder>
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
                                    <View>
                                        <View
                                            style={tw`bg-slate-300 w-10 flex items-center justify-center p-1 h-10 rounded-tl-lg rounded-bl-lg absolute bottom-0`}
                                        >
                                            <Text>Rp</Text>
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
                            </View>
                        </ScrollView>
                        <View style={tw`flex-row w-full absolute bottom-0`}>
                            <TouchableOpacity style={tw`w-1/2 bg-red-600  py-3  rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={() => modal.current.toggle()} >
                                <Text style={tw`text-white text-lg text-center ml-3`}>Batalkan Order</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={tw`w-1/2 bg-purple-600  py-3  rounded-tl-xl rounded-tr-xl flex-row justify-center`} onPress={handleSubmit} >
                                <Text style={tw`text-white text-lg text-center ml-3`}>Konfirmasi Order</Text>
                            </TouchableOpacity>
                        </View>
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
                style={tw`border  ${errors && touched ? 'border-red-400' : 'border-slate-300'} w-full rounded-lg px-3 h-10 pl-12`}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                value={values}
            />
        </>
    );
}

const EditSchema = Yup.object().shape({
    ammount: Yup.number()
        .required('Required'),
});
