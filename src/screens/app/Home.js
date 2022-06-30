import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Entypo, Feather, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '../../constants/colors'
import GoPremium from '../../assets/GoPremium.png'
import promo from '../../assets/promo.png'

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content'/>
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
          <Image source={GoPremium} style={styles.premiumImg}/>
        </View>
        
        <Text style={styles.subtitle}>Features</Text>
        
        <View style={styles.featureView}>
          <View>
            <MaterialCommunityIcons name='refresh-auto' size={25} color={colors.violet} style={[styles.featureIcon, { backgroundColor: '#F3EFFF' }]}/>
            <Text style={styles.feauteText}>Top Up</Text>
          </View>
          <View>
            <Feather name='send' size={25} color={colors.warning} style={[styles.featureIcon, { backgroundColor: '#FFF9EC' }]}/>
            <Text style={styles.feauteText}>Transfer</Text>
          </View>
          <View>
            <Fontisto name='world-o' size={25} color={colors.primary} style={[styles.featureIcon, { backgroundColor: '#E8FFF1' }]}/>
            <Text style={styles.feauteText}>Internet</Text>
          </View>
          <View>
            <FontAwesome5 name='wallet' size={25} color={colors.error} style={[styles.featureIcon, { backgroundColor: '#FFF1F0' }]}/>
            <Text style={styles.feauteText}>Wallet</Text>
          </View>
        </View>
        
        <View style={styles.featureView}>
          <View>
            <FontAwesome5 name='money-bill' size={25} color={colors.warning} style={[styles.featureIcon, { backgroundColor: '#FFF9EC' }]}/>
            <Text style={styles.feauteText}>Bill</Text>
          </View>
          <View>
            <Ionicons name='game-controller' size={25} color={colors.primary} style={[styles.featureIcon, { backgroundColor: '#E8FFF1' }]}/>
            <Text style={styles.feauteText}>Games</Text>
          </View>
          <View>
            <Fontisto name='mobile-alt' size={25} color={colors.error} style={[styles.featureIcon, { backgroundColor: '#FFF1F0' }]}/>
            <Text style={styles.feauteText}>Mobile</Text>
          </View>
          <View>
            <Entypo name='grid' size={25} color={colors.violet} style={[styles.featureIcon, { backgroundColor: '#F3EFFF' }]}/>
            <Text style={styles.feauteText}>More</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.subtitle}>Special Promo</Text>
          <Text style={styles.viewAllText}>View All</Text>
        </View>
        <View style={styles.promoDetails}>
          <View style={{flex: 1}}>
            <Image source={promo} style={styles.promoImg}/>
            <Text style={[styles.subtitle,{marginTop: 10, marginLeft: 5}]}>Bonus CashBank</Text>
            <Text style={[styles.nameText, {marginTop: 10, marginLeft: 5}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
          <View style={{flex: 1}}>
            <Image source={promo} style={styles.promoImg}/>
            <Text style={[styles.subtitle, {marginTop: 10, marginLeft: 5}]}>Bonus CashBank</Text>
            <Text style={[styles.nameText, {marginTop: 10, marginLeft: 5}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
        </View>
        <View style={styles.promoDetails}>
          <View style={{flex: 1}}>
            <Image source={promo} style={styles.promoImg}/>
            <Text style={[styles.subtitle,{marginTop: 10, marginLeft: 5}]}>Bonus CashBank</Text>
            <Text style={[styles.nameText, {marginTop: 10, marginLeft: 5}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
          <View style={{flex: 1}}>
            <Image source={promo} style={styles.promoImg}/>
            <Text style={[styles.subtitle, {marginTop: 10, marginLeft: 5}]}>Bonus CashBank</Text>
            <Text style={[styles.nameText, {marginTop: 10, marginLeft: 5}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </View>
        </View>
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
promoDetails: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 15
},
promoImg: {
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  width: '95%',
  height: 100
}
})