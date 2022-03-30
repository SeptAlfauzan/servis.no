import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
        borderRadius: 5,
    },
    focusCell: {
        borderColor: '#000',
    },
});

const CELL_COUNT = 6;

const Verification = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [disable, setDisable] = React.useState(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    React.useEffect(() => {
        value.length == 6 ? setDisable(false) : setDisable(true);
        console.log(value);
    }, [value])

    return (
        <SafeAreaView style={tw`flex h-full w-full px-10 pt-30`}>
            <Text style={styles.title}>Verification</Text>
            <Text style={tw`text-center text-slate-500 mt-4`}>Silahkan masukkan 6 digit kode verifikasi yang dikirimkan pada email anda.</Text>
            <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && tw`border-purple-600`]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <TouchableOpacity style={tw`${disable ? 'bg-slate-300' : 'bg-purple-600'} px-8 py-3 rounded-full mt-5`} disabled={disable} onPress={() => navigation.navigate('SuccessScreen')}>
                <Text style={tw`text-white text-lg font-bold text-center`}>Verifikasi</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default Verification;