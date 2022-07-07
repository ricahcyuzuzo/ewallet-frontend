import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    console.log(hasPermission);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
            <Text style={{color: colors.white}}>Ok</Text>
          </TouchableOpacity>
         </View>
    </View>
  )
}

export default Scan

const styles = StyleSheet.create({})