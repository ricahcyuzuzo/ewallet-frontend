
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import Home from '../../screens/app/Home';

const Stack = createNativeStackNavigator()

const Main = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    )
}

export default Main
