import { StyleSheet, Text, FlatList, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'


const History = () => {
    const logs = [
        { date: "12 Jan 2022", action: "send", name: "Netflix", Amount: "$50.00" },
        { date: "12 Jan 2022", action: "send", name: "Netflix", Amount: "$50.00" },
    ]

    const itemToRender = ({ item }) => {
        return (
            <View>
                <Text>{item.date}</Text>
                <View>
                    <Feather name='send' size={25} color={colors.warning} style={[styles.featureIcon, { backgroundColor: colors.warningBackground }]} />
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
})