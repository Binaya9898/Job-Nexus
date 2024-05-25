import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import SERVER from "../../constants/server";

const Employersignup = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyProfile, setCompanyProfile] = useState("image1.jpg");
  const [resume, setResume] = useState("image1.jpg");

  const handleRegisterNow = async () => {
    const url = SERVER.primaryUrl + "/employer/save";
    navigation.navigate("Employernav");

    const employerData = {
      firstName,
      middleName,
      lastName,
      email,
      password,
      address,
      contact,
      companyDescription,
      companyProfile,
      resume,
    };
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
            Employer Registration
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              placeholder="First Name *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setFirstName(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
            />
            <TextInput
              placeholder="Middle Name"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setMiddleName(text)}
              style={[styles.input, { flex: 1, marginHorizontal: 5 }]}
            />
            <TextInput
              placeholder="Last Name *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setLastName(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
            />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setEmail(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password *"
              placeholderTextColor={COLORS.bright}
              onChangeText={(text) => setPassword(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
              secureTextEntry
            />
          </View>

          <TextInput
            placeholder="Address"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Contact"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          />
          <TouchableOpacity
            // onPress={handleCompanyProfileUpload}
            style={[styles.fileUpload, { marginBottom: 20 }]}
          >
            <Text style={styles.uploadText}>
              {companyProfile
                ? "Company Profile Uploaded"
                : "Upload Company Profile *"}
            </Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleResumeUpload}
            style={[styles.fileUpload, { marginBottom: 20 }]}
          >
            <Text style={styles.uploadText}>
              {resume ? "Certificate" : "Certificate of verification *"}
            </Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            placeholder="Company Description"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setCompanyDescription(text)}
            style={[styles.input, { height: 100 }]}
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
    borderColor: COLORS.primary,
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
    borderColor: COLORS.primary,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGrey,
  },
  uploadText: {
    color: COLORS.primary,
  },
};

export default Employersignup;
