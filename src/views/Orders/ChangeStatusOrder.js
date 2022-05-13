import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Formik } from 'formik';
import * as Yup from 'yup';
import HeaderNav from '../../components/HeaderNav';
import ModalProcessOrder from '../../ModalProcessOrder';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import { CameraRoll, ToastAndroid } from "react-native"
// import RNFS from "react-native-fs"

export default function ChangeStatusOrder({ navigation, route }) {
    const { data } = route.params;
    const { text } = route.params;
    const modalChangeStatus = React.useRef(null);
    const modalCancel = React.useRef(null);

    const handleCancel = async (id) => {
        try {
            const response = await axios.put(`https://servisno.herokuapp.com/api/orders?id=${id}`, {
                canceled: true
            });
            console.log(response)
            alert(`Order dibatalkan`);
            navigation.navigate('ProcessOrder');
        } catch (error) {
            alert(error.message);
        }
    }


    const handleConfirm = async (data) => {
        try {
            const {
                id,
                order_status_id
            } = data;

            await axios.put(`https://servisno.herokuapp.com/api/orders?id=${id}`, {
                order_status_id: order_status_id + 1,
            });

            alert(`Berhasil mengganti status pesanan`);
            navigation.navigate('ProcessOrder');
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={tw`flex min-h-full bg-slate-50`}>
            <HeaderNav title="Detail Pesanan" navigation={navigation} />

            <>
                <ScrollView style={tw`h-full w-full`}>
                    <ModalProcessOrder
                        ref={modalChangeStatus}
                        submitStyle={tw`bg-purple-600`}
                        textBtnPrimary="Lanjutkan"
                        textBtnSecondary="Batal"
                        onSubmit={() => handleConfirm(data)}>
                        <Text style={tw`mb-3`}>
                            Tap 'Lanjutkan' untuk mengganti status transaksi ini menjadi '{text}'
                        </Text>
                    </ModalProcessOrder>
                    <ModalProcessOrder
                        ref={modalCancel}
                        submitStyle={tw`bg-red-600`}
                        textBtnPrimary="Iya, yakin"
                        textBtnSecondary="Tidak jadi"
                        onSubmit={() => handleCancel(data.id)}>
                        <Text style={tw`mb-3`}>
                            Apakah anda ingin membatalkan pesanan anda.
                        </Text>
                    </ModalProcessOrder>
                    <View style={Style.container}>
                        {data.canceled ?
                            (<Text style={tw`mr-auto left-8 text-red-600`}>
                                Pesanan dibatalkan
                            </Text>) : (
                                <Text style={tw`mr-auto left-8 text-green-600`}>
                                    Status pesanan: {data.order_status.name}
                                </Text>
                            )}
                        <View style={tw`w-full px-8`}>
                            <Text
                                style={Style.textLgBold}
                            >
                                Pelanggan
                            </Text>
                            <View
                                style={Style.descBoxContainer}
                            >
                                <View style={Style.textcontainer}>
                                    <Text style={Style.textSlate300}>Nama</Text>
                                    <Text>{data.user.name}</Text>
                                </View>
                                <View style={Style.textcontainer}>
                                    <Text style={Style.textSlate300}>Alamat</Text>
                                    <Text>{data.user.address}</Text>
                                </View>
                                <View style={Style.textcontainer}>
                                    <Text style={Style.textSlate300}>Nomor Telp.</Text>
                                    <Text>{data.user.phone}</Text>
                                </View>
                            </View>


                            <Text
                                style={Style.textLgBold}
                            >
                                Detail Pesanan
                            </Text>
                            <View
                                style={Style.descBoxContainer}
                            >
                                <View style={Style.textcontainer}>
                                    <Text style={Style.textSlate300}>Gadget</Text>
                                    <Text>{data.gadget}</Text>
                                </View>
                                <View style={tw`flex-row mt-3 w-full justify-between relative`}>
                                    <Text style={tw`text-slate-300 text-right`}>Keluhan</Text>
                                    <Text style={tw`flex-1 flex-wrap text-right`}>{data.complaint}</Text>
                                </View>
                            </View>
                            <Text
                                style={[Style.textLgBold, tw`mb-10`]}
                            >
                                Biaya
                            </Text>
                            <View>
                                <View
                                    style={tw`bg-slate-300 w-10 flex items-center justify-center p-1 h-10 rounded-tl-lg rounded-bl-lg absolute bottom-0`}
                                >
                                    <Text>Rp</Text>
                                </View>
                                <Text style={tw`ml-12 bottom-2`}>{data.bill}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View
                    style={tw`absolute bottom-0 flex-row w-full justify-between`}
                >
                    <TouchableOpacity style={tw`w-1/2 bg-red-600 py-2 px-3 flex justify-center`} onPress={() => modalCancel.current.toggle()}>
                        <Text style={tw`text-white font-bold text-center`}>
                            Batalkan pesanan
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`w-1/2 bg-purple-600 py-2 px-3 flex justify-center`} onPress={() => modalChangeStatus.current.toggle()}>
                        <Text style={tw`text-white font-bold text-center`}>
                            Ubah Status Menjadi {text}
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        </View>
    );
}

class Style {
    static textcontainer = tw`flex-row mt-3 w-full justify-between`;
    static descBoxContainer = tw`rounded-lg bg-slate-100 w-full p-4 my-3`;
    static textLgBold = tw`font-bold text-lg`;
    static textSlate300 = tw`text-slate-300`;
    static container = tw`mt-25 mb-20 flex items-center`;
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
});
