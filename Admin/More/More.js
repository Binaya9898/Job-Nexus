import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const More = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Encoders",
    email: "econders.com",
    website: "https://encoders.com",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contact: "1234567890",
    size: "100",
    founded: "2000",
    services: "Service 1, Service 2, Service 3",
  });

  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (key, value) => {
    setCompanyInfo({ ...companyInfo, [key]: value });
  };

  const handleUpdate = () => {
    // Implement update logic here (e.g., send data to server)
    setEditing(false);
    // Show confirmation message or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Company Profile</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Name:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.name}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{companyInfo.email}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Website:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.website}
              onChangeText={(text) => handleChange("website", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.website}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>About:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={companyInfo.about}
              onChangeText={(text) => handleChange("about", text)}
              multiline
            />
          ) : (
            <Text style={styles.text}>{companyInfo.about}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Contact:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.contact}
              onChangeText={(text) => handleChange("contact", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.contact}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Size:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.size}
              onChangeText={(text) => handleChange("size", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.size}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Founded:</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.founded}
              onChangeText={(text) => handleChange("founded", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.founded}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Services:</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={companyInfo.services}
              onChangeText={(text) => handleChange("services", text)}
              multiline
            />
          ) : (
            <Text style={styles.text}>{companyInfo.services}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={editing ? handleUpdate : handleEdit}>
          <Text style={styles.buttonText}>{editing ? "Update" : "Edit"}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  field: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default More;
