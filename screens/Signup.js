import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Button from '../components/Button';
import COLORS from '../constants/colors';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [cv, setCV] = useState(null);

  const navigation = useNavigation();

  const handleProfilePictureUpload = () => {
  };

  const handleCVUpload = () => {
  };

  const handleRegisterNow = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: COLORS.primary, textAlign: 'center' }}>
            Employee Registration
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

          <TouchableOpacity onPress={handleProfilePictureUpload} style={styles.fileUpload}>
            <Text style={styles.uploadText}>{profilePicture ? 'Profile Picture Uploaded' : 'Upload Profile Picture *'}</Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCVUpload} style={styles.fileUpload}>
            <Text style={styles.uploadText}>{cv ? 'CV Uploaded' : 'Upload CV *'}</Text>
            <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            placeholder="Description"
            placeholderTextColor={COLORS.grey}
            onChangeText={(text) => setDescription(text)}
            style={[styles.input, { height: 100, textAlignVertical: 'top', marginTop: 20 }]}
            multiline
          />

          <Button title="Register Now" onPress={handleRegisterNow} filled style={{ marginTop: 20 }} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
