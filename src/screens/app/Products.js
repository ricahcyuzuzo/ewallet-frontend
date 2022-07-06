import { StyleSheet, Text, FlatList, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'


const Products = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenClose = () => {
    setModalVisible(!modalVisible)
  }

    const logs = [
        { name: "Mouse", price: 2000, code: 23 },
        { name: "Keyboard", price: 2002, code: 21 }, ]

    const itemToRender = ({ item }) => {
        return (
            <View style={[styles.wrapper, { backgroundColor: '#E8FFF1',  padding: 10, marginTop: 10, }]}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, marginTop: 10,}}>
                    <View style={{ flexDirection: 'row'}}>
                      <Feather name='archive' size={45} color={colors.primary} />
                      <View style={{ marginLeft: 10,}}>
                      <Text>{item.name}</Text>
                      <Text style={{ marginTop: 5, color: '#4c4c4c'}}>Code: {item.code}</Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 7,}}>
                        <Text>{item.price} RWF</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={handleOpenClose} style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: colors.primary, marginBottom: 10,}}>
            <Feather name='plus' color={colors.white} size={24} />
          </TouchableOpacity>
            <FlatList data={logs} renderItem={itemToRender} />
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
              <TextInput placeholder='Name' style={styles.amountToRequest} />
              <TextInput placeholder='Price in RWF' style={styles.amountToRequest} />
              <TouchableOpacity style={styles.requestButton}>
                <Text style={{ color: colors.white }}>Create</Text>
              </TouchableOpacity>
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