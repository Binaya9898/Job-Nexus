import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Welcome');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/splash.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome to Job Nexus</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        marginTop: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
    },
});

export default SplashScreen;
