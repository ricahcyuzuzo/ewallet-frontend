import { ActivityIndicator, Button, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors } from '../../constants/colors'
import Icon from '../../assets/Icon.png';
import Input from '../../components/Input';
import { country } from '../../assets/country';
import { Entypo } from '@expo/vector-icons';
import Country from '../../components/Country';
import axios from 'axios';
import { ENDPOINT } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../app/Context';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [choosedCountry, setChoosedCountry ] = useState(country[0]);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const { setLoggedIn } = useContext(AppContext);

    const handleChange = (val) => {
        setPhone(val);
    }

    const handleChangePassord = (val) => {
        setPassword(val);
    }
    
    const handleChangePasswordVisiblility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleLogin = async () => {
        setLoading(true);
        axios.post(`${ENDPOINT}/login`, {
            phone: `${choosedCountry.dial_code}${phone}`,
            password
        }).then(async res => {
            setLoading(false);
            console.log(res);
            await AsyncStorage.setItem('token', res.data.token);
            await AsyncStorage.setItem('loggedIn', 'true');
            await AsyncStorage.setItem('names', res.data.names);
            await AsyncStorage.setItem('id', res.data.id);
            setLoggedIn(true);
        }).catch(err => {
            setLoading(false);
            console.log(err.response.data);
        })
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
      <Text style={{ color: '#fff', fontSize: 18}}>Login</Text>
      <Image source={Icon} style={styles.image} />
      <View style={styles.inputViews}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.openCountry}>
            <Entypo name='chevron-small-down' size={20} color={colors.white} style={styles.dropdownIcon} />
            <Text style={styles.flagColor}>{choosedCountry.flag}</Text>
            <Text style={styles.dialCode}>{choosedCountry.dial_code}</Text>
        </TouchableOpacity>
        <Input handleTextChange={handleChange} isPassword={false} placeholder='Phone number' keyboardType='numeric' isPhone={true} />
      </View>
      <View style={{ marginTop: 30,}}>
        <Input placeholder='Password' isPassword={passwordVisible} isPhone={false} handleTextChange={handleChangePassord} />
        <TouchableOpacity onPress={handleChangePasswordVisiblility} style={styles.eyeButton}>
            <Entypo name={passwordVisible ? 'eye' : 'eye-with-line'} size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30,}}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            { loading ? <ActivityIndicator size={24} color={colors.white} /> :  <Text style={styles.buttonText}>Login</Text> }
        </TouchableOpacity>
      </View>
      <Country country={country} handleClose={() => setModalVisible(false)} modalVisible={modalVisible} setChoosedCountry={setChoosedCountry}  />
      <Text style = {styles.signUpText}>If you don't have account <Text onPress={()=> navigation.navigate('Registration')} style = {{ color: '#121a12' }}>Sign up Here.</Text></Text>
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
        marginTop: 50,
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
        marginTop: 100,
        fontSize: 17
    },
    openCountry: {
        flexDirection: 'row',
        width: '25%',
        borderBottomWidth: 1,
        borderBottomColor: colors.white
    }
})