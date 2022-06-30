import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';

const Input = ({ placeholder, handleTextChange, isPassword, keyboardType, isPhone }) => {
    const keyType = keyboardType?.length > 0 ? keyboardType : 'default';
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={handleTextChange}
            secureTextEntry={isPassword}
            keyboardType={keyType}
            style={[styles.textInputStyles, isPhone ? { width: '70%' } : null]}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    textInputStyles: {
        color: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
        padding: 10,
    }
})