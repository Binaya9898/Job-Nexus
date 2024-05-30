import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const JobDetails = ({ route }) => {
    const { job } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.location}>{job.location}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.description}>{job.description}</Text>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply for this job</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333333",
    },
    company: {
        fontSize: 20,
        color: "#666666",
        marginBottom: 5,
    },
    location: {
        fontSize: 18,
        color: "#999999",
    },
    content: {
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: "#666666",
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: "#39B68D",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
    },
    applyButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default JobDetails;
