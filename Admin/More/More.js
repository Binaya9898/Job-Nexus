import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
// Update the path accordingly
import COLORS from '../../constants/colors';

const More = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Encoders",
    email: "info@encoders.com",
    website: "https://encoders.com",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    contact: "123-456-7890",
    size: "100",
    founded: "2000",
    services: "Service 1, Service 2, Service 3",
    logo: require('../../assets/all.png'),
  });

  const [editing, setEditing] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  const handleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      setLogMessage('Editing company profile...');
    } else {
      setLogMessage('');
    }
  };

  const handleChange = (key, value) => {
    setCompanyInfo({ ...companyInfo, [key]: value });
  };

  const handleUpdate = () => {
    setEditing(false);
    setLogMessage('Company profile updated successfully!');
    setTimeout(() => setLogMessage(''), 3000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Company Profile</Text>
        {companyInfo.logo && (
          <Image source={companyInfo.logo} style={styles.logo} />
        )}
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
          {editing ? (
            <TextInput
              style={styles.input}
              value={companyInfo.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          ) : (
            <Text style={styles.text}>{companyInfo.email}</Text>
          )}
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
        {logMessage ? <Text style={styles.log}>{logMessage}</Text> : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.primary,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  field: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.secondary,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 5,
    padding: 8,
    color: COLORS.black,
    width: '100%',
    textAlign: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  log: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
});

export default More;
