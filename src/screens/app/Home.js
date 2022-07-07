import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather, FontAwesome5, Fontisto,  Ionicons,  MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import GoPremium from '../../assets/walletIcon.png'
import promo from '../../assets/promo.png'
import QRCode from 'react-native-qrcode-svg'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ENDPOINT } from '../../constants/api'

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [requestAmount, setRequestAmount] = useState('');

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
   const token = await AsyncStorage.getItem('token');
   axios.get(`${ENDPOINT}/transactions`, {
      headers: {
        Authorization: token
      }
   }).then(res => {
    setData(res.data);
    console.log(res.data);
   }).catch(err => console.log(err));
  }

  const handleOpenClose = () => {
    setModalVisible(!modalVisible)
  }

  const handleOpenClose1 = () => {
    setModalVisible1(!modalVisible1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Hello!</Text>
            <Text style={styles.nameText}>Jimmy Sulivan</Text>
          </View>
          <TouchableOpacity onPress={async() => {
            await AsyncStorage.setItem('loggedIn', 'false');
          }} style={styles.bellView}>
            <Ionicons name='log-out-outline' size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.premiumSection}>
          <Image source={GoPremium} style={styles.premiumImg} />
          <View style={styles.texts}>
            {data?.account ? <Text style={styles.balance}>{data?.account?.balance} RWF</Text> : <TouchableOpacity onPress={async () => {
              setLoading(true);
              const token = await AsyncStorage.getItem('token');

              axios.post(`${ENDPOINT}/account`, {} , {
                headers: {
                  Authorization: token
                }
              }).then(res => {
                getData();
                setLoading(false);
              }).catch(err => {
                console.log(err)
                setLoading(false);
              })
            }} style={{ padding: 5, backgroundColor: colors.white, borderRadius: 5, alignItems: 'center'}}>{loading ? <ActivityIndicator size='small' color={colors.primary} /> : <Text style={{ color: colors.primary}}>Add Account +</Text>}</TouchableOpacity>}
            {data?.account ? <Text style={styles.underBalance}>Manage your budget on your will</Text> : <Text style={styles.underBalance}>You have no Account now, Please add one.</Text>}
          </View>
        </View>

        <Text style={styles.subtitle}>Features</Text>

        <View style={styles.featureView}>
          <TouchableOpacity onPress={handleOpenClose}>
            <MaterialCommunityIcons name='refresh-auto' size={25} color={colors.violet} style={[styles.featureIcon, { backgroundColor: '#F3EFFF' }]} />
            <Text style={styles.feauteText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOpenClose1}>
            <Feather name='download' size={25} color={colors.primary} style={[styles.featureIcon, { backgroundColor: colors.warningBackground }]} />
            <Text style={styles.feauteText}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Products')}>
            <Fontisto name='archive' size={25} color={colors.warning} style={[styles.featureIcon, { backgroundColor: '#E8FFF1' }]} />
            <Text style={styles.feauteText}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('History')}>
            <FontAwesome5 name='wallet' size={25} color={colors.error} style={[styles.featureIcon, { backgroundColor: '#FFF1F0' }]} />
            <Text style={styles.feauteText}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.subtitle}>Recent Transactions</Text>
          <Text style={styles.viewAllText} onPress={() => navigation.navigate('History')} >View All</Text>
        </View>
        <ScrollView style={{ marginTop: 30 }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {
            data?.transactions?.slice(0, 3).map((item, index) => {
              return (
                <View key={index} style={item.status === 'Incoming' ? styles.promoDetails : styles.promoDetailsSend }>
                  <AntDesign name={item.status === 'Incoming' ? 'plus' : 'minus'} size={25} color={colors.white} style={[styles.promoIcon, { backgroundColor: item.status === 'Incoming' ? colors.primary : colors.error }]} />
                  <Text style={[styles.nameText, { marginTop: 10, textAlign: 'center' }]}>{item.action}</Text>
                  <Text style={[styles.subtitle, { marginTop: 10, textAlign: 'center' }]}>{item.status}</Text>
                  <View style={styles.promoAmount}>
                    <Text style={styles.promoAmountText}>{item.amount}</Text>
                  </View>
                </View>
              )
            })
          }
          {/* <View style={styles.promoDetailsTopup}>
            <MaterialCommunityIcons name='refresh-auto' size={25} color={colors.white} style={[styles.promoIcon, { backgroundColor: colors.warning }]} />
            <Text style={[styles.nameText, { marginTop: 10, textAlign: 'center' }]}>Liam Okkur</Text>
            <Text style={[styles.subtitle, { marginTop: 10, textAlign: 'center' }]}>0784302922</Text>
            <View style={styles.promoAmount}>
              <Text style={styles.promoAmountTextTopup}>+$ 80.00</Text>
            </View>
          </View>
          <View style={styles.promoDetailsSend}>
            <Feather name='send' size={25} color={colors.white} style={[styles.promoIcon, { backgroundColor: colors.error }]} />
            <Text style={[styles.nameText, { marginTop: 10, textAlign: 'center' }]}>Liam Okkur</Text>
            <Text style={[styles.subtitle, { marginTop: 10, textAlign: 'center' }]}>0784302922</Text>
            <View style={styles.promoAmount}>
              <Text style={styles.promoAmountTextSend}>+$ 80.00</Text>
            </View>
          </View> */}
        </ScrollView>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={styles.scan}>
        <Ionicons name='scan' color={colors.white} size={24} />
      </TouchableOpacity>
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
            <View style={styles.inputs}>
              <TextInput placeholder='Amount to request' onChangeText={(val) => setRequestAmount(val)} style={styles.amountToRequest} />
              <TouchableOpacity onPress={async () => {
                setLoading(true);
                const token = await AsyncStorage.getItem('token');
                axios.patch(`${ENDPOINT}/recharge`, { amount: requestAmount }, {
                  headers: {
                    Authorization: token
                  }
                }).then(res => {
                  console.log(res.data);
                  getData();
                  setLoading(false);
                }).catch(err => {
                  console.log(err.response.data)
                  setLoading(false);
                });
              }} style={styles.requestButton}>
                {loading ? <ActivityIndicator size='small' color={colors.white} /> : <Text style={{ color: colors.white }}>Request</Text>}
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
        <View style={styles.centeredView1}>
          <View style={styles.modalView1}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' }}>Receive</Text>
            <TouchableOpacity onPress={handleOpenClose1} style={styles.closeButtonModal}>
              <Ionicons name='close' size={24} color={colors.white} />
            </TouchableOpacity>
            <View style={[styles.inputs, { alignItems: 'center',}]}>
              <QRCode value='receiver_id' size={250} />
              <Text style={{
                fontSize: 20,
                textAlign: 'center',
                marginTop: 20,
              }}>Scan this QR Code to send money here.</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  headerView: {
    flexDirection: "row"
  },
  titleView: {
    flex: 8
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    // fontFamily: 'cochin'
  },
  nameText: {
    // fontFamily: 'cochin',
    color: colors.subtitle
  },
  subtitle: {
    // fontFamily: 'cochin',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 40
  },
  premiumSection: {
    marginTop: 30,
    width: '100%',
    height: 150,
    backgroundColor: colors.primary,
    borderRadius: 20,
    flexDirection: 'row'
  },
  premiumImg:{
    width: 120,
    height: 120,
    transform: [
      { rotate: '-0.5rad'},
    ]
  },
  featureView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  featureIcon: {
    padding: 15,
    borderRadius: 22
  },
  feauteText: {
    textAlign: 'center',
    marginTop: 8
  },
  viewAllText: {
    textAlign: 'right',
    fontSize: 12,
    color: colors.subtitle,
    marginTop: 40
  },
  promoIcon: {
    padding: 15,
    borderRadius: 22,
    alignSelf: 'center'
  },
  promoDetails: {
    marginTop: 15,
    width: 180,
    backgroundColor: '#E8FFF1',
    padding: 35,
    borderRadius: 25,
    marginRight: 15

  },
  promoAmount: {
    width: '95%',
    backgroundColor: colors.white,
    borderRadius: 15,
    height: 35,
    marginTop: 20
  },
  promoAmountText: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.primary,
  },
  promoDetailsSend: {
    marginTop: 15,
    width: 180,
    backgroundColor: '#FFF1F0',
    padding: 35,
    borderRadius: 25,
    marginRight: 15

  },
  promoAmountTextSend: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.error,
  },
  promoDetailsTopup: {
    marginTop: 15,
    width: 180,
    backgroundColor: colors.warningBackground,
    padding: 35,
    borderRadius: 25,
    marginRight: 15

  },
  promoAmountTextTopup: {
    marginTop: 5,
    textAlign: 'center',
    color: colors.warning,
  },
  scan: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  balance: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold'
  },
  underBalance: {
    color: colors.white,
    width: 200,
    flexWrap: 'wrap'
  },
  texts: {
    marginTop: 10,
    marginLeft: 10
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
    height: 300,
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
  }
})