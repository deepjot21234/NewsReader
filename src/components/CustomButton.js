import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

const CustomButton = ({ title, navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: 300,
          height: 50,
          backgroundColor: "yellow",
          justifyContent: "center",
          borderRadius: 20,
        }}
        onPress={() => navigation.navigate("BottomNav")}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
