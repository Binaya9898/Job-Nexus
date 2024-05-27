import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import COLORS from '../../constants/colors';

const Searchh = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        console.log('Searching for jobs with query:', searchQuery);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Job Search</Text>
            </View>
            <View style={styles.content}>
                <TextInput
                    placeholder="Search by category, title, name, description, location, etc."
                    placeholderTextColor={COLORS.grey}
                    onChangeText={setSearchQuery}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    content: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: COLORS.lightGrey,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Searchh;
