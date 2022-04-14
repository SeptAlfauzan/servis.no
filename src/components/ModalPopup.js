import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback } from 'react-native';
import tw from 'twrnc';

const ModalPopup = ({ children, active }, ref) => {
    const [modalVisible, setModalVisible] = useState(false);

    React.useImperativeHandle(
        ref,
        () => ({
            toggleShow() {
                setModalVisible(!modalVisible);
            }
        }),
    )

    return (
        // <TouchableWithoutFeedback onPress={() => setModalVisible(false)} style={[tw`h-full w-full bg-black absolute`]}>
        <View style={[styles.centeredView, tw`absolute`]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
        // </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
});

export default React.forwardRef(ModalPopup);