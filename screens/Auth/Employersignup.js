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
  const [employer_first_name, setFirstName] = useState("");
  const [employer_middle_name, setMiddleName] = useState("");
  const [employer_last_name, setLastName] = useState("");
  const [employer_email, setEmail] = useState("");
  const [employer_password, setPassword] = useState("");
  const [employer_address, setAddress] = useState("");
  const [employer_contact, setContact] = useState("");
  const [employer_description, setCompanyDescription] = useState("");
  const [employer_company_name, setCompanyName] = useState("image1.jpg");
  const [employer_image, setimage] = useState("image1.jpg");
  const [employer_certificate, setResume] = useState("image1.jpg");

  const handleRegisterNow = async () => {
    const employerData = {
      employer_email,
      employer_password,
      employer_first_name,
      employer_middle_name,
      employer_last_name,
      employer_address,
      employer_contact,
      employer_company_name,
      employer_image,
      employer_description,
      employer_certificate,
    };
    console.log(employerData);
    fetch(SERVER.primaryUrl + "/employer/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Ensure you are returning response.json()
      })
      .then((json) => {
        console.log("Job posted successfully", json);
        navigation.navigate("Success1", {
          title: "Successfully Registered",
          description: "Your details has been successfully registered.",
          navigation1: "Login",
          buttonText1: "Login",
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
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
            {/* <TextInput
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
            /> */}
            <TextInput
              placeholder="Full Name *"
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

          {/* <TextInput
            placeholder="Address"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setAddress(text)}
            style={styles.input}
          /> */}
          <TextInput
            placeholder="Contact"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Company Name"
            placeholderTextColor={COLORS.bright}
            onChangeText={(text) => setCompanyName(text)}
            style={styles.input}
          />
          <TouchableOpacity
            // onPress={handleCompanyProfileUpload}
            style={[styles.fileUpload, { marginBottom: 20 }]}
          >
            <Text style={styles.uploadText}>
              {employer_certificate
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
              {employer_certificate
                ? "Certificate"
                : "Certificate of verification *"}
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
