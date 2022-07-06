import { StyleSheet, Text, FlatList, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'


const History = () => {
    const logs = [
        { date: "12 Jan 2022", action: "send", name: "Netflix", Amount: "$50.00" },
        { date: "12 Jan 2022", action: "received", name: "Netflix", Amount: "$50.00" },
    ]

    const itemToRender = ({ item }) => {
        return (
            <View style={[styles.wrapper, { backgroundColor: item.action === 'send' ? '#E8FFF1' : '#FFF1F0', padding: 10, marginTop: 10, }]}>
                <Text style={{ fontSize: 12,}}>{item.date}</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: 10, marginTop: 10,}}>
                    <Feather name={item.action === 'send' ? 'upload' : 'download' } size={40} color={item.action === 'send' ? colors.primary : colors.error} />
                    <View>
                        <Text>Top up</Text>
                        <Text>$12.50</Text>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={logs} renderItem={itemToRender} />
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