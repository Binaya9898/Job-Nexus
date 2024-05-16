import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Login, Signup } from "../screens";
import Profile from "../App/Profile/Profile";
import Home from "../App/Home/Home";
import More from "../App/More/More";
import Jobs from "../App/Jobs/Jobs";
import Favourite from "../App/Favourite/Favourite";
import Notification from "../App/Notification/More/Notification";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

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

      <Tab.Screen
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
      />

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
        name="More"
        component={More}
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
