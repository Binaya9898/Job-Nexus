import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Signup, Welcome } from "./screens";
import Nav from "./Nav/Nav";
import Employersignup from "./screens/Auth/Employersignup";
import Employernav from "./Nav/Employernav";
import Mainmenu from "./App/More/menu/Mainmenu";
import Jobdetail from "./App/Jobs/Jobdetail";
import Success from "./components/Success";

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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Employernav"
          component={Employernav}
          options={{
            title: "Employernav",
          }}
        />

        <Stack.Screen
          name="Jobdetail"
          component={Jobdetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
