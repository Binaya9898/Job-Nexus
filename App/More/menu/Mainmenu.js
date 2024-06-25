// Mainmenu.js

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import More from "../More";
import Faq from "./Faq";
import Aboutus from "./Aboutus";
import Help from "./Help";
import Logout from "./Logout";
import FavoriteJobs from "./FavoriteJobs";

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
      <Stack.Screen name="Favorite" component={FavoriteJobs} />
    </Stack.Navigator>
  );
};

export default Mainmenu;
