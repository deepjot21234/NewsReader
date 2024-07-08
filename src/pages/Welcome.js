import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";
import { containerStyle } from "../styles";

const WelcomeImage = require("../../assets/img/welcome.jpg");

const Welcome = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading === false ? (
        <ImageBackground
          imageStyle={{ opacity: 0.7 }}
          source={WelcomeImage}
          style={[containerStyle.container, { width: "100%", height: "100%" }]}>
          <Text
            style={{
              fontSize: 100,
              fontWeight: "bold",
              color: "black",
              backgroundColor: "yellow",
              paddingHorizontal: 10,
            }}>
            NEWS
          </Text>
          <Text
            style={{
              fontSize: 45,
              fontWeight: "bold",
              color: "black",
              borderColor: "yellow",
              borderWidth: 2,
              padding: 12,
            }}>
            READER APP
          </Text>

          <View style={{ marginTop: 200 }}>
            <CustomButton
              navigation={navigation}
              title={"Get Started"}></CustomButton>
          </View>
        </ImageBackground>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
