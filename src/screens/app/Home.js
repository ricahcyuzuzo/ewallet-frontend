import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather, FontAwesome5, Fontisto,  MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import GoPremium from '../../assets/GoPremium.png'
import promo from '../../assets/promo.png'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Hello!</Text>
            <Text style={styles.nameText}>Jimmy Sulivan</Text>
          </View>
          <View style={styles.bellView}>
            <FontAwesome5 name="bell" size={20} />
          </View>
        </View>
        <View style={styles.premiumSection}>
          <Image source={GoPremium} style={styles.premiumImg} />
        </View>

        <Text style={styles.subtitle}>Features</Text>

        <View style={styles.featureView}>
          <View>
            <MaterialCommunityIcons name='refresh-auto' size={25} color={colors.violet} style={[styles.featureIcon, { backgroundColor: '#F3EFFF' }]} />
            <Text style={styles.feauteText}>Top Up</Text>
          </View>
          <View>
            <Feather name='send' size={25} color={colors.warning} style={[styles.featureIcon, { backgroundColor: colors.warningBackground }]} />
            <Text style={styles.feauteText}>Transfer</Text>
          </View>
          <View>
            <Fontisto name='world-o' size={25} color={colors.primary} style={[styles.featureIcon, { backgroundColor: '#E8FFF1' }]} />
            <Text style={styles.feauteText}>Internet</Text>
          </View>
          <View>
            <FontAwesome5 name='wallet' size={25} color={colors.error} style={[styles.featureIcon, { backgroundColor: '#FFF1F0' }]} />
            <Text style={styles.feauteText}>Wallet</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.subtitle}>Recent Transactions</Text>
          <Text style={styles.viewAllText} onPress={() => navigation.navigate('History')} >View All</Text>
        </View>
        <ScrollView style={{ marginTop: 30 }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.promoDetails}>
            <AntDesign name='gift' size={25} color={colors.white} style={[styles.promoIcon, { backgroundColor: colors.primary }]} />
            <Text style={[styles.nameText, { marginTop: 10, textAlign: 'center' }]}>Liam Okkur</Text>
            <Text style={[styles.subtitle, { marginTop: 10, textAlign: 'center' }]}>0784302922</Text>
            <View style={styles.promoAmount}>
              <Text style={styles.promoAmountText}>+$ 80.00</Text>
            </View>
          </View>
          <View style={styles.promoDetailsTopup}>
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
          </View>
        </ScrollView>
      </ScrollView>

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
    fontFamily: 'cochin'
  },
  nameText: {
    fontFamily: 'cochin',
    color: colors.subtitle
  },
  subtitle: {
    fontFamily: 'cochin',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 40
  },
  premiumImg: {
    width: '100%',
    height: 150,
    resizeMode: 'center',
    borderRadius: 20,
    alignSelf: 'center'
  },
  premiumSection: {
    marginTop: 30
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
  }
})