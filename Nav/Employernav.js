import { View, Text } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Login, Signup } from "../screens";
import Profile from "../Admin/Profile/Profile";
import Home from "../Admin/Home/Home";
import More from "../Admin/More/More";
import Jobs from "../Admin/Jobpost/Postjob";
import Favourite from "../Admin/Favourite/Favourite";
import Notification from "../Admin/Notification/More/Notification";

import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import Postjob from "../Admin/Jobpost/Postjob";

const Tab = createMaterialBottomTabNavigator();
const color = COLORS.secondary;

const Employernav = () => {
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
        name="Post Job"
        component={Postjob}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Applications"
        component={Favourite}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={"#39B68D"} size={26} />
          ),
        }}
      />*/}

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

export default Employernav;
