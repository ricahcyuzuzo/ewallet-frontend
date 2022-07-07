import { ActivityIndicator, Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants/colors'
import Icon from '../../assets/Icon.png';
import Input from '../../components/Input';
import { country } from '../../assets/country';
import { Entypo } from '@expo/vector-icons';
import Country from '../../components/Country';
import axios from 'axios';
import { ENDPOINT } from '../../constants/api';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [choosedCountry, setChoosedCountry ] = useState(country[0]);
    const [passwordVisible, setPasswordVisible] = useState(true);

    const handlePhoneChange = (val) => {
        setPhone(val);
    }
    const handleChangeUsername = (val) => {
        setUsername(val);
    }

    const handleChangePassword = (val) => {
        setPassword(val);
    }
    
    const handleChangePasswordVisiblility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleRegister = () => {
        setLoading(true)
        axios.post(`${ENDPOINT}/user`, {
            names: username,
            phone: `${choosedCountry.dial_code}${phone}`,
            password: password,
            type: 'user'
        }).then(res => {
            setLoading(false);
            navigation.navigate('Login');
        }).catch(err => {
            setLoading(false);
            console.log(err.response.data)
        });
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
      <Image source={Icon} style={styles.image} />
      <View style={{ marginTop: 30,}}>
        <Input placeholder='Full Names' isPassword={false} isPhone={false} handleTextChange={handleChangeUsername} keyboardType='default' />
      </View>
      <View style={styles.inputViews}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.openCountry}>
            <Entypo name='chevron-small-down' size={20} color={colors.white} style={styles.dropdownIcon} />
            <Text style={styles.flagColor}>{choosedCountry.flag}</Text>
            <Text style={styles.dialCode}>{choosedCountry.dial_code}</Text>
        </TouchableOpacity>
        <Input handleTextChange={handlePhoneChange} isPassword={false} placeholder='Phone number' keyboardType='numeric' isPhone={true} />
      </View>
      <View style={{ marginTop: 30,}}>
        <Input placeholder='Password' isPassword={passwordVisible} isPhone={false} handleTextChange={handleChangePassword} keyboardType='default' />
        <TouchableOpacity onPress={handleChangePasswordVisiblility} style={styles.eyeButton}>
            <Entypo name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30,}}>
        <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
            {loading ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={styles.buttonText}>Register</Text>}
        </TouchableOpacity>
      </View>
      <Country country={country} handleClose={() => setModalVisible(false)} modalVisible={modalVisible} setChoosedCountry={setChoosedCountry}  />
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: '#121a12',
        borderRadius: 10,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 40, 
    },
    buttonText: {
        color: colors.white
    },
    eyeButton: {
        width: 30,
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 11,
    },
    container: {
        flex: 1,
        backgroundColor: '#25c166',
        padding: 30,
    },
    dropdownIcon: {
        marginTop: 10,
    },
    image: {
        width: '80%',
        height: 100,
        resizeMode: 'center',
        marginTop: 30,
    },
    inputViews: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flagColor: {
        fontSize: 25,
    },
    dialCode: {
        color: colors.white,
        marginTop: 10,
    },
    signUpText: {
      color: colors.white,
      marginTop: 50,
      fontSize: 17
  },
    openCountry: {
        flexDirection: 'row',
        width: '25%',
        borderBottomWidth: 1,
        borderBottomColor: colors.white
    }
})