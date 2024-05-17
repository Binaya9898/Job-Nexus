import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class Home extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('../Home/Images/3.jpg')} // Replace with your logo image
                        style={styles.logo}
                    />
                    <Text style={styles.headerText}>Job Portal</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome back, Employee!</Text>
                    <Text style={styles.subtitle}>Explore job opportunities and apply for your dream job.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Jobs')}
                    >
                        <Text style={styles.buttonText}>Explore Jobs</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#007260', // Primary color
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // White color for text
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333', // Dark text color
    },
    subtitle: {
        fontSize: 16,
        color: '#666666', // Medium text color
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#39B68D', // Secondary color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
