import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import COLORS from "../../constants/colors";
import RNPickerSelect from "react-native-picker-select";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Searchh = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    if (selectedOption && searchQuery) {
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const apiUrl = `http://192.168.1.66:8000/api/jobs?${selectedOption}=${encodedSearchQuery}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response:", data);
        setJobs(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log("Please select an option and enter a search query");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.jobDetails}>
        <Text style={styles.title}>{item.job_title}</Text>
        <Text style={styles.company}>{item.job_company_name}</Text>
        <Text style={styles.location}>{item.job_address}</Text>
        <Text style={styles.salary}>{item.salary}</Text>
        <Text style={styles.details}>{item.details}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <FontAwesome
          name={item.isFavorite ? "heart" : "heart-o"}
          size={24}
          color="red"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Job Search</Text>
      </View>
      <RNPickerSelect
        style={styles.picker}
        onValueChange={(value) => setSelectedOption(value)}
        items={[
          { label: "Address", value: "job_address" },
          { label: "Type", value: "job_type" },
          { label: "Company", value: "job_company_name" },
        ]}
      />
      <View style={styles.content}>
        <TextInput
          placeholder="Enter search query"
          placeholderTextColor={COLORS.grey}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsHeading}>Search Results:</Text>
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 10,
    fontSize: 24,
    borderColor: COLORS.grey,
    height: 50,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  content: {},
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
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  company: {
    color: COLORS.grey,
    marginBottom: 5,
  },
  location: {
    color: COLORS.grey,
  },
  salary: {
    color: COLORS.primary,
    marginTop: 5,
  },
  details: {
    marginTop: 5,
  },
  favoriteButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  detailsButton: {
    marginTop: 5,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: "center",
  },
  detailsButtonText: {
    color: COLORS.white,
  },
});

export default Searchh;
