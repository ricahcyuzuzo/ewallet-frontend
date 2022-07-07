import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Main from './src/navigations/private/Main';
import Auth from './src/navigations/public/Auth';
import AppContext from './src/screens/app/Context';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const isLoggedIn = await AsyncStorage.getItem('loggedIn');
    setLoggedIn(isLoggedIn === 'true' ? true : false)
  }

  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      <NavigationContainer>
        { loggedIn ? <Main /> : <Auth />}
      </NavigationContainer>
    </AppContext.Provider>
  );
}