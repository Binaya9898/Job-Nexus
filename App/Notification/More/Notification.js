import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class EmployeeNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [
                { id: 1, message: "Your application for the Software Engineer position has been viewed by ABC Company.", date: "May 12, 2024" },
                { id: 2, message: "New job recommendation: Web Developer at XYZ Tech.", date: "May 10, 2024" },
                { id: 3, message: "Congratulations! You have been shortlisted for the Data Analyst role at PQR Inc.", date: "May 8, 2024" },
                { id: 4, message: "Reminder: Complete your profile to improve your job matches.", date: "May 5, 2024" },
                { id: 5, message: "You have received a message from a recruiter regarding a job opportunity.", date: "May 2, 2024" },
                { id: 6, message: "New job alert: Marketing Manager position available at LMN Corp.", date: "April 29, 2024" },
                { id: 7, message: "Your job application for the Sales Associate role has been rejected.", date: "April 25, 2024" },
                { id: 8, message: "Reminder: Attend the upcoming job fair on May 20th to explore job opportunities.", date: "April 22, 2024" },
                { id: 9, message: "You have received a recommendation to apply for the Product Manager position at GHI Industries.", date: "April 18, 2024" },
                { id: 10, message: "Congratulations! You have been hired as a Software Developer at EFG Solutions.", date: "April 15, 2024" },
            ]
        };
    }

    deleteNotification = (id) => {
        this.setState(prevState => ({
            notifications: prevState.notifications.filter(notification => notification.id !== id)
        }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Notifications</Text>
                {this.state.notifications.map(notification => (
                    <View key={notification.id} style={styles.notificationContainer}>
                        <View style={styles.notificationContent}>
                            <Text style={styles.message}>{notification.message}</Text>
                            <Text style={styles.date}>{notification.date}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => this.deleteNotification(notification.id)}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {this.state.notifications.length === 0 && (
                    <Text>No notifications</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    notificationContent: {
        flex: 1,
    },
    message: {
        fontSize: 16,
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#999999',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
