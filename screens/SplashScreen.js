import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Welcome");
        }, 3000); // 3 seconds

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            style={styles.container}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/tick.png")}
                    style={styles.logo}
                />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
});

export default SplashScreen;
