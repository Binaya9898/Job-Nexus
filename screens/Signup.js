import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import SERVER from "../constants/server";
import * as ImagePicker from "expo-image-picker";

const Signup = ({ navigation }) => {
  const [employee_first_name, setFirstName] = useState("");
  const [employee_middle_name, setMiddleName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [employee_address, setAddress] = useState("");
  const [employee_contact, setContact] = useState("");
  const [employee_description, setDescription] = useState("");
  const [employee_image, setProfilePicture] = useState("image1.jpg");
  const [employee_cV, setCV] = useState("image2.jpg");
  const [img, setImg] = useState(
    `${SERVER.imageUrl}/images/employee/profile/Screenshot_20240602_112945_com.facebook.katana.jpg`
  );

  const handleRegisterNow = () => {
    const employeeData = {
      employee_first_name,
      employee_middle_name,
      employee_last_name,
      employee_email,
      employee_password,
      employee_address,
      employee_contact,
      employee_description,
      employee_image,
      employee_cV,
    };

    console.log(employeeData);
    fetch(SERVER.primaryUrl + "/employee/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
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

    const handleCv = () => {};
    const handleImage = () => {};
  };

  const handleCv = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCV(result.assets[0].fileName);
      console.log("CV URI: ", result.assets[0].fileName);

      Alert.alert("CV selected", "Your CV has been successfully selected.");
    }
  };

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfilePicture(result.assets[0].fileName);
      console.log("Image URI: ", result.assets[0].fileName);
      setImg(
        `${SERVER.imageUrl}/images/employee/profile/${result.assets[0].fileName}`
      );
      console.log("total url: " + img);

      Alert.alert(
        "Image selected",
        "Your profile image has been successfully selected."
      );
    }
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
            Employee Registration
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              placeholder="First Name *"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setFirstName(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
            />
            <TextInput
              placeholder="Middle Name"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setMiddleName(text)}
              style={[styles.input, { flex: 1, marginHorizontal: 5 }]}
            />
            <TextInput
              placeholder="Last Name *"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setLastName(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
            />
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              placeholder="Email *"
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

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              placeholder="Address"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setAddress(text)}
              style={[styles.input, { flex: 1, marginRight: 5 }]}
              multiline
            />
            <TextInput
              placeholder="Contact"
              placeholderTextColor={COLORS.grey}
              onChangeText={(text) => setContact(text)}
              style={[styles.input, { flex: 1, marginLeft: 5 }]}
            />
          </View>

          <TouchableOpacity style={styles.fileUpload} onPress={handleImage}>
            <Text style={styles.uploadText}>Image</Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fileUpload} onPress={handleCv}>
            <Text style={styles.uploadText}>CV</Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            placeholder="Description"
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setDescription(text)}
            style={[
              styles.input,
              { height: 100, textAlignVertical: "top", marginTop: 20 },
            ]}
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
    marginBottom: 20,
  },
  uploadText: {
    color: COLORS.grey,
  },
};

export default Signup;
