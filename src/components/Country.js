import { StyleSheet, Text, View, Modal, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import  { Entypo } from '@expo/vector-icons'

const Country = ({ modalVisible, handleClose, setChoosedCountry, country }) => {
    const [countries, setCountry] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = () => {
        setCountry(country);
    }

    const handleChoose = (item) => {
        setChoosedCountry(item);
        handleClose();
    }

    const itemToRender = ({item}) => {
        return (
            <TouchableOpacity onPress={() => handleChoose(item)} style={styles.countryRow}>
                <Text style={styles.flagIcon}>{item.flag}</Text>
                <Text style={styles.countryText}>{item.dial_code}</Text>
                <Text style={styles.countryText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType='fade'
        onRequestClose={handleClose}
        transparent={true}
      >
        <View style={styles.container}>
            <TouchableOpacity onPress={handleClose} style={styles.closeIcon}>
                <Entypo name='cross' size={24} color={colors.white} />
            </TouchableOpacity>
            <FlatList 
                data={countries}
                renderItem={itemToRender}
                ItemSeparatorComponent={() => <View style={{ width: '95%', alignSelf: 'center', backgroundColor: '#c4c4c4', height: 1,}} />}
            />
        </View>
      </Modal>
    </View>
  )
}

export default Country

const styles = StyleSheet.create({
    closeIcon: {
        backgroundColor: colors.primary,
        width: 30,
        height:30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        margin: 10,
    },  
    container: {
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        height: '60%',
        backgroundColor: colors.white,
        top: '31%',
    },
    countryRow: {
        flexDirection: 'row',
        height: 60,
        padding: 10,
        width: '90%',
    },
    flagIcon: {
        fontSize: 30,
    },
    countryText: {
        marginHorizontal: 6,
        marginTop: 15,
    },
})