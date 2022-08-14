import { StyleSheet, Text, FlatList, View, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import axios from 'axios'
import { ENDPOINT } from '../../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCode from 'react-native-qrcode-svg'


const Products = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    getProducts();
  }, []);
  const handleOpenClose = () => {
    setModalVisible(!modalVisible)
  }

  const handleOpenClose1 = () => {
    setModalVisible1(!modalVisible1)
  }

  const getProducts = async () => {
    const token = await AsyncStorage.getItem('token');
    axios.get(`${ENDPOINT}/products`, { headers: {
      Authorization: token
    }}).then((res) => {
      console.log(res.data);
      setProduct(res.data.results);
    }).catch((err) => console.log(err));
  }

    const itemToRender = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
              setSelectedItem(item);
              handleOpenClose1();
            }} style={[styles.wrapper, { backgroundColor: '#E8FFF1',  padding: 10, marginTop: 10, }]}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, marginTop: 10,}}>
                    <View style={{ flexDirection: 'row'}}>
                      <Feather name='archive' size={45} color={colors.primary} />
                      <View style={{ marginLeft: 10,}}>
                      <Text>{item.name}</Text>
                      <Text style={{ marginTop: 5, color: '#4c4c4c'}}>Code: {item.code.slice(0, 8)}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 7,}}>
                        <Text>{item.price} RWF</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={handleOpenClose} style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: colors.primary, marginBottom: 10,}}>
            <Feather name='plus' color={colors.white} size={24} />
          </TouchableOpacity>
            <FlatList data={product} renderItem={itemToRender} />
            <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleOpenClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={handleOpenClose} style={styles.closeButtonModal}>
              <Ionicons name='close' size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20, width: 200, alignSelf: 'center'}}>Add Product</Text>

            <View style={styles.inputs}>
              <TextInput onChangeText={(val) => setName(val) } placeholder='Name' style={styles.amountToRequest} />
              <TextInput onChangeText={(val) => setPrice(val) } placeholder='Price in RWF' style={styles.amountToRequest} />
              <TouchableOpacity onPress={async () => {
                const token = await AsyncStorage.getItem('token');
                setLoading(true);
                axios.post(`${ENDPOINT}/add-product`, {
                  name,
                  price
                }, {
                  headers: {
                    Authorization: token
                  }
                }).then(res => {
                  setLoading(false);
                  setModalVisible(!modalVisible);
                  getProducts();
                }).catch(err => {
                  setLoading(false);
                }) 
              }} style={styles.requestButton}>
                { loading ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={{ color: colors.white }}>Create</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible1}
        onRequestClose={handleOpenClose1}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { height: 500, alignItems: 'center',}]}>
            <TouchableOpacity onPress={handleOpenClose1} style={styles.closeButtonModal}>
              <Ionicons name='close' size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={styles.inputs}>
            <QRCode value={`pay,${selectedItem?.code}`} size={250} />
              <Text style={{
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
              }}>Scan this QR Code to pay this {selectedItem?.name} at {selectedItem?.price} RWF. </Text>
            </View>
          </View>
        </View>
      </Modal>

        </SafeAreaView>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 30,
    },
    featureIcon: {
        padding: 15,
        borderRadius: 22
    },
    wrapper: {
        width: '100%',
        height: 100,
        borderRadius: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
      width: '90%',
      height: 350,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    centeredView1: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView1: {
      width: '90%',
      height: 500,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    closeButtonModal: {
      position: 'absolute',
      top: 20,
      right: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 10,
      width: 30,
      height: 30,
    },
    amountToRequest: {
      borderWidth: 1,
      borderColor: colors.primary,
      width: '90%',
      height: 50,
      padding: 10,
      borderRadius: 10,
      margin: 5,
    },
    requestButton: {
      width: '90%',
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      margin: 5,
    },
    inputs: {
      marginTop: 80,
      alignSelf: 'center',
      width: '90%',
      alignItems: 'center'
    }
})