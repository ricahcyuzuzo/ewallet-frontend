import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import History from "../../screens/app/History";
import Home from "../../screens/app/Home";
import Products from "../../screens/app/Products";
import Scan from "../../screens/app/Scan";
import Login from "../../screens/auth/Login";
import Registration from "../../screens/auth/Registration";

const Stack = createNativeStackNavigator()

const Auth = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Registration" component={Registration} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,

            }} />
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="History" component={History} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerTintColor: colors.primary,
            }} />
            <Stack.Screen name="Products" component={Products} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerTintColor: colors.primary,
            }} />
             <Stack.Screen name="Scan" component={Scan} options={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.white,
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerShown: false,
                headerTintColor: colors.primary,
            }} />
        </Stack.Navigator>
    )
}

export default Auth

