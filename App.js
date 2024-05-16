import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome } from "./screens";
import Nav from "./Nav/Nav";
import Employersignup from "./screens/Auth/Employersignup";
import Employernav from "./Nav/Employernav";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Employersignup"
          component={Employersignup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Nav"
          component={Nav}
          options={{
            title: "Nav",
          }}
        />
        <Stack.Screen
          name="Employernav"
          component={Employernav}
          options={{
            title: "Employernav",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
