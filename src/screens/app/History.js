import { StyleSheet, Text, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import { ENDPOINT } from '../../constants/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import jwtDecode from 'jwt-decode'


const History = () => {
    const [data, setData] = useState({});
    const [userId, setUserId] = useState('');
    const [trans, setTrans] = useState([]);

    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken?.user?._id);
        axios.get(`${ENDPOINT}/transactions`, {
           headers: {
             Authorization: token
           }
        }).then(res => {
         setData(res.data);
         console.log(data)
         const array = [];
         res.data.transactions.forEach(element => {
             if(element.fromId === decodedToken?.user?._id || element?.toId === decodedToken?.user?._id){
             array.push(element);
             }
         });
        setTrans(array);
        }).catch(err => console.log(err.response));
    }
    const itemToRender = ({ item }) => {
        return (
            <View style={[styles.wrapper, { backgroundColor: item.fromId === userId && item.toId === userId ? '#E8FFF1' : item.toId === userId ? '#E8FFF1' : '#FFF1F0', padding: 10, marginTop: 10, }]}>
                <Text style={{ fontSize: 12,}}>{item.createdAt}</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, marginTop: 10,}}>
                    <Feather name={item.fromId === userId && item.toId === userId ? 'download' : item.fromId === userId ? 'upload' : 'download' } size={40} color={item.fromId === userId && item.toId === userId ? colors.primary : item.fromId === userId ? colors.error : colors.primary } />
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
            <FlatList data={trans} renderItem={itemToRender} />
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