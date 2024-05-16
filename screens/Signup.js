import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import COLORS from "../constants/colors";

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");

  const handleProfilePictureUpload = () => {
    // Logic for profile picture upload
  };

  const handleResumeUpload = () => {
    // Logic for resume upload
  };

  const handleRegisterNow = () => {
    // Navigate to the Login page
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              color: COLORS.primary,
              textAlign: "center",
            }}
          >
            Job Seeker Registration
          </Text>

          {/* First Name and Last Name */}
          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="First Name *"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setFirstName(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
            />
            <TextInput
              placeholder="Last Name *"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setLastName(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
            />
          </View>

          {/* Email and Password */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setEmail(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password *"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setPassword(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
              secureTextEntry
            />
          </View>

          {/* Profile Picture and Resume */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity onPress={handleProfilePictureUpload} style={[styles.fileUpload, { flex: 1, marginRight: 5 }]}>
              <Text style={styles.uploadText}>
                {profilePicture ? "Profile Picture Uploaded" : "Upload Profile Picture *"}
              </Text>
              <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleResumeUpload} style={[styles.fileUpload, { flex: 1, marginLeft: 5 }]}>
              <Text style={styles.uploadText}>
                {resume ? "Resume Uploaded" : "Upload Resume *"}
              </Text>
              <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Contact"
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setContact(text)}
            style={[styles.input, { marginTop: 20 }]}
          />

          <TextInput
            placeholder="Skills"
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setSkills(text)}
            style={[styles.input, { marginTop: 20 }]}
            multiline
          />

          <TextInput
            placeholder="Education"
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setEducation(text)}
            style={[styles.input, { height: 100, textAlignVertical: "top", marginTop: 20 }]}
            multiline
          />
          <Button
            title="Register Now"
            onPress={handleRegisterNow}
            filled
            style={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  fileUpload: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGrey,
  },
  uploadText: {
    color: COLORS.grey,
  },
};

export default Signup;
