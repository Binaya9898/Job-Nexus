import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icons

// Function to generate a random image URL from Lorem Picsum
const getRandomImage = () => {
  const width = 50; // Width of the image
  const height = 50; // Height of the image
  const randomImageId = Math.floor(Math.random() * 1000); // Generate a random image ID
  return `https://picsum.photos/id/${randomImageId}/${width}/${height}`;
};

export default function Jobs() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Co.",
      location: "San Francisco, CA",
      salary: "$100,000 - $120,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Startup X",
      location: "New York, NY",
      salary: "$120,000 - $140,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Corp",
      location: "Chicago, IL",
      salary: "$90,000 - $110,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Design Studio",
      location: "Los Angeles, CA",
      salary: "$100,000 - $120,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 5,
      title: "Marketing Manager",
      company: "Marketing Solutions",
      location: "Seattle, WA",
      salary: "$110,000 - $130,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 6,
      title: "Software Developer",
      company: "Tech Solutions Inc.",
      location: "Austin, TX",
      salary: "$95,000 - $115,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 7,
      title: "Financial Analyst",
      company: "Finance Corp",
      location: "Boston, MA",
      salary: "$85,000 - $105,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 8,
      title: "Project Manager",
      company: "Project Co.",
      location: "Denver, CO",
      salary: "$105,000 - $125,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 9,
      title: "HR Specialist",
      company: "HR Solutions",
      location: "Miami, FL",
      salary: "$80,000 - $100,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    {
      id: 10,
      title: "Sales Representative",
      company: "Sales Corp",
      location: "San Diego, CA",
      salary: "$90,000 - $110,000",
      image: getRandomImage(), // Random image URL
      isFavorite: false, // Flag to track if the job is favorited
    },
    // Add more job objects with isFavorite property if needed
  ]);

  const [visibleJobs, setVisibleJobs] = useState(8); // Number of jobs initially visible
  const [allJobsLoaded, setAllJobsLoaded] = useState(false); // Flag to track if all jobs are loaded

  const loadMoreJobs = () => {
    if (visibleJobs + 8 >= jobs.length) {
      setVisibleJobs(jobs.length);
      setAllJobsLoaded(true);
    } else {
      setVisibleJobs(visibleJobs + 8);
    }
  };

  const toggleFavorite = (id) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, isFavorite: !job.isFavorite } : job
      )
    );
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.jobDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.location}>{item.location}</Text>
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
    <View style={styles.container}>
      <FlatList
        data={jobs.slice(0, visibleJobs)} // Only display the visible number of jobs
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          !allJobsLoaded ? (
            <TouchableOpacity
              style={styles.loadMoreButton}
              onPress={loadMoreJobs}
            >
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 60,
  },
  jobItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    color: "#555",
    marginBottom: 5,
  },
  location: {
    color: "#555",
  },
  salary: {
    marginTop: 5,
    color: "#007bff",
  },
  details: {
    marginTop: 5,
  },
  favoriteButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    // marginLeft: 10,
  },
  favoriteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadMoreButton: {
    backgroundColor: "#39B68D",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  loadMoreButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsButton: {
    marginTop: 5,
    color: "#fff",
    backgroundColor: "#39B68D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
});
