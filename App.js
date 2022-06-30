import { NavigationContainer } from '@react-navigation/native';
import Main from './src/navigations/private/Main';
import Auth from './src/navigations/public/Auth';

export default function App() {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
}