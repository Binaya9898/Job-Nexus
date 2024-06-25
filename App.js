import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import { Login, Signup, Welcome } from "./screens";
import Nav from "./Nav/Nav";
import Employersignup from "./screens/Auth/Employersignup";
import Employernav from "./Nav/Employernav";
import Mainmenu from "./App/More/menu/Mainmenu";
import Jobdetail from "./App/Jobs/Jobdetail";
import Home from "./App/Home/Home";
import Success from "./components/Success";
import Postjob from "./Admin/Jobpost/Postjob";
import Success1 from "./components/Success1";
import Forgotpw from "./screens/Auth/Forgotpw";
import Recoverotp from "./screens/Auth/Recoverotp";
import Createnewpw from "./screens/Auth/Createnewpw";
import EmployeeSignup from "./screens/Auth/EmployeeSignup";
import ApplicationForm from "./App/application/ApplicationForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="EmployeeSignup" component={EmployeeSignup} />
        <Stack.Screen name="Employersignup" component={Employersignup} />
        <Stack.Screen name="Nav" component={Nav} />
        <Stack.Screen
          name="Employernav"
          component={Employernav}
          options={{ title: "Employernav" }}
        />
        <Stack.Screen name="Jobdetail" component={Jobdetail} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Success1" component={Success1} />
        <Stack.Screen name="Postjob" component={Postjob} />
        <Stack.Screen name="Forgotpw" component={Forgotpw} />
        <Stack.Screen name="Recoverotp" component={Recoverotp} />
        <Stack.Screen name="Createnewpw" component={Createnewpw} />
        <Stack.Screen name="ApplicationForm" component={ApplicationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
