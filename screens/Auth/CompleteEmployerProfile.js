import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import COLORS from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import SERVER from "../../constants/server";
import * as ImagePicker from "expo-image-picker";

const CompleteEmployerProfile = ({ route, navigation }) => {
  const { id } = route.params; // Extract id from route params
  const [address, setAddress] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("Inactive"); // Default to "Inactive"
  const [companyName, setCompanyName] = useState("");
  const [panVat, setPanVat] = useState("");
  const [certificate, setCertificate] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const uri = pickerResult.assets[0]?.uri || pickerResult.uri;
      const fileName = uri
        ? uri.split("/").pop().split("?")[0].split("#")[0]
        : "Unknown";
      console.log("File Name:", fileName);
      setImage(uri);
    }
  };

  const handleCompleteProfile = () => {
    if (!address || !description || !companyName || !panVat) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const profileData = {
      user_id: id,
      employer_address: address,
      employer_slug: slug,
      employer_status: status,
      employer_company_name: companyName,
      employer_pan_vat: panVat,
      employer_certificate: certificate,
      employer_image: "image1.jpg",
      employer_description: description,
      company_website: website,
    };

    console.log(profileData);
    const parsedData = JSON.stringify(profileData);
    console.log("Parsed Data is: " + parsedData);

    fetch(`${SERVER.primaryUrl}/employer/complete-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: parsedData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log("User Added Successfully", data);
        Alert.alert("Profile Completed Successfully");
        navigation.navigate("Login"); // Navigate to Home on success
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error is:", error);
        Alert.alert("Error", "Failed to complete profile.");
      });
  };

  const handleSkip = () => {
    navigation.navigate("Login"); // Navigate to Home on skip
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.gradientBackground}
        >
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Complete Your Profile</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imagePreview} />
              ) : (
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color={COLORS.primary}
                />
              )}
              <Text style={styles.imagePickerText}>
                {image ? "Change Image" : "Add Image"}
              </Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Ionicons name="home-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Address *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setAddress(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="link-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Slug *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setSlug(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="briefcase-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Company Name *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setCompanyName(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="PAN/VAT *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setPanVat(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="document-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Certificate"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setCertificate(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
              <TextInput
                placeholder="Description *"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setDescription(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="globe-outline" size={24} color={COLORS.primary} />
              <TextInput
                placeholder="Website"
                placeholderTextColor={COLORS.grey}
                onChangeText={(text) => setWebsite(text)}
                style={styles.input}
              />
            </View>

            <Button
              title={loading ? "Updating..." : "Complete Profile"}
              onPress={handleCompleteProfile}
              filled
              disabled={loading}
              style={{ marginTop: 20 }}
            />

            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.imagePickerText}>
                {"Skip? You won't be able to apply for jobs"}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: "center",
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  imagePickerText: {
    color: COLORS.primary,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});

export default CompleteEmployerProfile;
