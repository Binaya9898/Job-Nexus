import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default class EmployerHome extends Component {
    state = {
        notifications: [
            { id: '1', message: 'New job application received' },
            { id: '2', message: 'Your job post has been approved' },
            { id: '3', message: 'Reminder: Complete your profile' },
            { id: '4', message: 'Your job post has expired' },
            { id: '5', message: 'Update: New feature released' },
            { id: '6', message: 'Your account has been verified' },
            { id: '7', message: 'Congratulations! You have a new follower' },
            { id: '8', message: 'Reminder: Upcoming event next week' },
            { id: '9', message: 'Feedback: Please rate our app' },
            { id: '10', message: 'Your subscription will expire soon' },
        ],
    };

    deleteNotification = id => {
        this.setState(prevState => ({
            notifications: prevState.notifications.filter(notification => notification.id !== id),
        }));
    };

    renderNotificationItem = ({ item }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
            <TouchableOpacity onPress={() => this.deleteNotification(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Notifications</Text>
                <FlatList
                    data={this.state.notifications}
                    renderItem={this.renderNotificationItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.notificationList}
                />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#39B68D', // Secondary color
    },
    notificationList: {
        paddingBottom: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 16,
        flex: 1,
        color: '#333',
    },
    deleteButton: {
        fontSize: 16,
        color: 'red',
    },
});
