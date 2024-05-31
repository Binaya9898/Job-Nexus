import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Welcome");
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require("../assets/splash.png")} style={styles.logo} />
            <Text style={styles.title}>Welcome to Job Finder</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
});

export default SplashScreen;