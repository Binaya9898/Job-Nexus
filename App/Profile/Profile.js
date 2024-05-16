import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

const Profile = () => {
    const profile = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        bio: "Software engineer and cat lover",
        avatar: "https://example.com/jane-doe-avatar.png",
    };
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [bio, setBio] = useState(profile.bio);
    const [avatar, setAvatar] = useState(profile.avatar);

    const handleSubmit = () => {
        // Here you can send the updated profile data to your backend or save it locally
        Alert.alert("Profile Updated Successfully");
    };

    const openImagePicker = () => {
        // Implement your image picker logic here
        Alert.alert("Open Image Picker");
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: avatar }}
                />
                <TouchableOpacity
                    style={styles.changeAvatarButton}
                    onPress={openImagePicker}
                >
                    <Text style={styles.changeAvatarButtonText}>Change Avatar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Bio"
                    value={bio}
                    onChangeText={setBio}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "80%",
    },
    label: {
        marginTop: 20,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#39B68D",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
    avatarContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeAvatarButton: {
        marginTop: 10,
    },
    changeAvatarButtonText: {
        color: "#39B68D",
        fontSize: 18,
    },
});

export default Profile;
