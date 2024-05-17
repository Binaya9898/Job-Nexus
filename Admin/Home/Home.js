import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class EmployerHome extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome, Employer!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Manage Your Jobs</Text>
                    {/* Display list of jobs here */}
                </View>
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => this.props.navigation.navigate('../Jobs')}>
                    <Text style={styles.buttonText}>Post a Job</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007260', // Primary color
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        color: '#39B68D', // Secondary color
    },
    postButton: {
        backgroundColor: '#39B68D', // Secondary color
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
