import AnDesign from "react-native-vector-icons/AntDesign";
import Details from "../../pages/Details";
import Home from "../../pages/Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../../pages/ProfileScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState } from "react";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigation = () => {
  const [tabBackground, setTabBackground] = useState();
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: tabBackground,
      }}>
      <Tab.Screen
        name="Feed"
        component={Home}
        listeners={{
          tabPress() {
            setTabBackground("red");
          },
        }}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AnDesign name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Details}
        listeners={{
          tabPress() {
            setTabBackground("pink");
          },
        }}
        options={{
          tabBarLabel: "Updates",
          tabBarIcon: ({ color }) => (
            <AnDesign name="search1" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        listeners={{
          tabPress() {
            setTabBackground("green");
          },
        }}
        options={{
          tabBarLabel: "About",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
