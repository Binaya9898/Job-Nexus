import React, { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Postjob from "../Admin/Jobpost/Postjob";
import Employernav from "../Nav/Employernav";

const Success = ({ navigation }) => {
  const handleList = () => {
    navigation.navigate(Postjob);
  };
  const handleMore = () => {
    navigation.navigate(Employernav);
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
        height: "50%",
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.container}>
        <Image style={styles.icon} source={require("../assets/tick.png")} />
        <Text style={styles.title}>Successfully posted job</Text>
        <Text style={styles.description}>
          Your job has been successfully posted and is now visible to potential
          candidates.
        </Text>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={handleList}
        >
          <Text style={styles.buttonText}>Post More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={handleMore}
        >
          <Text style={styles.buttonText}>View List</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007260",
    alignItems: "center",
    paddingTop: 150,
  },
  icon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 22,
    color: "#FFFFFF",
  },
  description: {
    marginTop: 20,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    margin: 40,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#121212",
    fontSize: 20,
  },
});
