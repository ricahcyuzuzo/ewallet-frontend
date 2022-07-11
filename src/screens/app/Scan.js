import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { ENDPOINT } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    console.log(hasPermission);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    Alert.alert('EWallet', 'Are you sure you want to proceed with this transaction?', [
      {
        text: 'Yes',
        onPress: async () => {
          setLoading(true)
          const token = await AsyncStorage.getItem('token')
          const qrData = data.split(',');
          console.log(qrData);
          if(qrData[0] === 'pay'){
            axios.post(`${ENDPOINT}/pay`, {
              code: qrData[1]
            }, {
              headers: {
                Authorization: token
              }
            })
            .then((res) => {
              console.log(res.data);
              setLoading(false)
              navigation.goBack();
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
             });
          }else{
            axios.post(`${ENDPOINT}/send?receiver_id=${qrData[1]}`, {
              amountToSend: 1000
            }, {
              headers: {
                Authorization: token
              }
            })
            .then((res) => {
              console.log(res.data);
              setLoading(false)
              navigation.goBack();
            })
            .catch(err => {
              console.log(err);
              setLoading(false);
             });
          }
        }
      },
      {
        text: 'No',
      }
    ],
    {
      cancelable: true,
    })

  };

  return (
    <View style={{ margin: 0, padding: 0, flex: 1, backgroundColor: colors.white}}>
      <StatusBar hidden={false} barStyle='light-content' />
         <View style={{ width: '100%', height: '80%', position: 'absolute', top: -80, left: 0,}}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned } style={{ width: '100%', height: '100%', borderRadius: 10,}} />
          <Ionicons name='md-scan-outline' size={300} color={colors.white} style={{ position: 'absolute', bottom: 150, alignSelf: 'center' }} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white , position: 'absolute', top: 140, right: 10, }}>
            <Ionicons name='close' color={colors.primary} size={24} />
          </TouchableOpacity>
         </View>
         <View style={{
          position: 'absolute',
          bottom: 20,
          height: 300,
          width: '100%'
         }}>
          <View style={{ width: '90%',alignSelf: 'center',height: 100, borderRadius: 20, paddingHorizontal: 20, backgroundColor: '#E8FFF1', marginTop: 40, justifyContent: 'center', }}>
            <Text style={{ color: colors.primary, textAlign: 'center', fontSize: 20, }}>Scan the QRCode to Send Money or Pay.</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ alignSelf: 'center', marginTop: 40,width: '90%', height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, borderRadius: 20, }}>
            {loading ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={{color: colors.white}}>Ok</Text>}
          </TouchableOpacity>
         </View>
    </View>
  )
}

export default Scan

const styles = StyleSheet.create({})