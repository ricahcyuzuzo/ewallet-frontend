import { StyleSheet, Text, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { ENDPOINT } from '../../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const History = () => {
    const [data, setData] = useState({});
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
         console.log(data)
        }).catch(err => console.log(err.response));
    }
    const itemToRender = ({ item }) => {
        return (
            <View style={[styles.wrapper, { backgroundColor: item.status === 'Incoming' ? '#E8FFF1' : '#FFF1F0', padding: 10, marginTop: 10, }]}>
                <Text style={{ fontSize: 12,}}>{item.createdAt}</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, marginTop: 10,}}>
                    <Feather name={item.status === 'Incoming' ? 'download' : 'upload' } size={40} color={item.status === 'Incoming' ? colors.primary : colors.error} />
                    <View style={{ width: '80%'}}>
                        <Text>{item.action}</Text>
                        <Text>{item.amount} RWF</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={data.transactions} renderItem={itemToRender} />
        </SafeAreaView>
    )
}

export default History

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
    }
})