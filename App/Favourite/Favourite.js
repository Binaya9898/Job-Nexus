import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default class JobPostingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobTitle: '',
            jobCategory: '',
            address: '',
            companyName: '',
            experience: '',
            maxSalary: '',
            minSalary: '',
            contact: '',
            validity: '',
            description: '',
            jobType: '',
            jobHour: ''
        };
    }

    handlePostJob = () => {
        // Basic validation, you can add more complex validation as needed
        if (!this.state.jobTitle || !this.state.jobCategory || !this.state.address || !this.state.companyName) {
            alert('Please fill out all required fields');
            return;
        }

        // Handle posting job data here, you can send this data to your backend or wherever you store it
        console.log('Posting job:', this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Post a Vacancy</Text>
                <View style={styles.formContainer}>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 2 }]}
                            placeholder="Job Title"
                            onChangeText={(text) => this.setState({ jobTitle: text })}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Job Category"
                            onChangeText={(text) => this.setState({ jobCategory: text })}
                        />
                        <TextInput
                            style={[styles.input, { flex: 2 }]}
                            placeholder="Address"
                            onChangeText={(text) => this.setState({ address: text })}
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 2 }]}
                            placeholder="Company Name"
                            onChangeText={(text) => this.setState({ companyName: text })}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Experience"
                            onChangeText={(text) => this.setState({ experience: text })}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Max Salary"
                            onChangeText={(text) => this.setState({ maxSalary: text.replace(/[^0-9]/g, '') })} // Accept numbers only
                            keyboardType="numeric" // Show numeric keyboard
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Min Salary"
                            onChangeText={(text) => this.setState({ minSalary: text.replace(/[^0-9]/g, '') })} // Accept numbers only
                            keyboardType="numeric" // Show numeric keyboard
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Contact"
                            onChangeText={(text) => this.setState({ contact: text.replace(/[^0-9]/g, '') })} // Accept numbers only
                            keyboardType="phone-pad" // Show phone number keyboard
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Validity (dd-mm-yyyy)"
                            onChangeText={(text) => this.setState({ validity: text })}
                        />
                    </View>
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 2 }]}
                            placeholder="Type"
                            onChangeText={(text) => this.setState({ jobType: text })}
                        />
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder="Duty Hour"
                            onChangeText={(text) => this.setState({ jobHour: text })}
                        />
                    </View>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Job Description"
                        onChangeText={(text) => this.setState({ description: text })}
                        multiline={true}
                    />
                </View>
                <Button
                    title="Post Job"
                    onPress={this.handlePostJob}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginRight: 5,
    },
});
