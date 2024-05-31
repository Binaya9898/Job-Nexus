// Mainmenu.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import More from "../More"; // Ensure this 
import Faq from "./Faq"; // Ensure this path is correct
import Aboutus from "./Aboutus"; // Ensure this path is correct
import Help from "./EmpProfile"; // Ensure this path is correct
import Logout from "./Logout"; // Ensure this path is correct

const Stack = createNativeStackNavigator();

const Mainmenu = () => {
  return (
    <Stack.Navigator initialRouteName="More">
      <Stack.Screen
        name="More"
        component={More}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="Aboutus" component={Aboutus} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};

export default Mainmenu;
