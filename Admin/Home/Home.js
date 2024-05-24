import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

export default class EmployerHome extends Component {
    state = {
        jobs: [],
    };

    componentDidMount() {
        this.fetchJobs();
    }

    fetchJobs = async () => {
        try {
            // Replace the URL with your API endpoint
            const response = await fetch('YOUR_API_ENDPOINT');
            const jobs = await response.json();
            this.setState({ jobs });
        } catch (error) {
            console.error(error);
        }
    };

    renderJobItem = ({ item }) => (
        <View style={styles.jobItem}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Welcome, Employer!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Manage Your Jobs</Text>
                    <FlatList
                        data={this.state.jobs}
                        renderItem={this.renderJobItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.jobList}
                    />
                </View>
                <TouchableOpacity
                    style={styles.postButton}
                    onPress={() => this.props.navigation.navigate('Postjob')}
                >
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#007260', // Primary color
    },
    content: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#39B68D', // Secondary color
    },
    jobList: {
        width: '100%',
    },
    jobItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    jobCompany: {
        fontSize: 16,
        color: '#666',
    },
    postButton: {
        backgroundColor: '#39B68D', // Secondary color
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 30,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
