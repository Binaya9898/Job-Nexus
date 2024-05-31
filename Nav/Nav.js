import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../App/Home/Home";
import Jobs from "../App/Jobs/Jobs";
import Notification from "../App/Notification/More/Notification";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Mainmenu from "../App/More/menu/Mainmenu";
import Searchh from "../App/Search/Searchh";

const Tab = createMaterialBottomTabNavigator();
const color = COLORS.secondary;

const Nav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#ffffff", // Color of the active tab
        inactiveTintColor: "#bfbfbf", // Color of the inactive tabs
        style: { backgroundColor: "#00ff00" }, // Background color of the tab bar (green in this case)
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={"#39B68D"} size={26} /> // Corrected icon name
          ),
        }}
      />

      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Wishlist"
        component={Favourite}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={"#39B68D"} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="notifications-outline"
              color={"#39B68D"}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Searchh"
        component={Searchh}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mainmenu"
        component={Mainmenu}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ellipsis-horizontal-outline"
              color={"#39B68D"}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Nav;
