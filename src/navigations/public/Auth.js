import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import Home from "../../screens/app/Home";
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
        </Stack.Navigator>
    )
}

export default Auth

