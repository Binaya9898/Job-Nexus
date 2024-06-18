import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../constants/colors";

const SplashScreen = () => {
  const navigation = useNavigation();
  const dot1Opacity = useRef(new Animated.Value(0)).current;
  const dot2Opacity = useRef(new Animated.Value(0)).current;
  const dot3Opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot1Opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <ImageBackground
      source={{
        uri: "https://img.itch.zone/aW1nLzEzOTE5MzYzLmdpZg==/original/21Ko3v.gif",
      }}
      style={styles.container}
    >
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Job Nexus</Text>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading</Text>
        <Animated.Text style={[styles.loadingText, { opacity: dot1Opacity }]}>
          .
        </Animated.Text>
        <Animated.Text style={[styles.loadingText, { opacity: dot2Opacity }]}>
          .
        </Animated.Text>
        <Animated.Text style={[styles.loadingText, { opacity: dot3Opacity }]}>
          .
        </Animated.Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.white,
  },
});

export default SplashScreen;
