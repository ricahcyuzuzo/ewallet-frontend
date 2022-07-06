import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';

const Scan = () => {
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
    <View style={{ margin: 0, padding: 0, flex: 1}}>
      <StatusBar hidden={false} barStyle='light-content' />
         <View style={{ width: '100%', height: '80%', position: 'absolute', top: -80, left: 0,}}>
          <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned } style={{ width: '100%', height: '100%'}} />
         </View>
         <View style={{
          position: 'absolute',
          bottom: 20,
         }}>
          <Text>Hello</Text>
         </View>
    </View>
  )
}

export default Scan

const styles = StyleSheet.create({})