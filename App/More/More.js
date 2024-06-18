// More.js

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const More = ({ navigation }) => {
  const data = [
    {
      id: 1,
      name: "About Us",
      image: "https://img.icons8.com/clouds/100/000000/groups.png",
      count: 124.711,
      destination: "Aboutus",
    },
    {
      id: 2,
      name: "Help",
      image: "https://img.icons8.com/color/100/000000/real-estate.png",
      count: 234.722,
      destination: "Help",
    },
    {
      id: 3,
      name: "FAQ",
      image: "https://img.icons8.com/color/100/000000/find-matching-job.png",
      count: 324.723,
      destination: "Faq",
    },
    {
      id: 4,
      name: "Log Out",
      image: "https://img.icons8.com/clouds/100/000000/employee-card.png",
      count: 154.573,
      destination: "Logout",
    },

    {
      id: 5,
      name: "Favorite",
      image: "https://img.icons8.com/clouds/100/000000/employee-card.png",
      count: 154.573,
      destination: "Favorite",
    },
  ];

  const [options, setOptions] = React.useState(data);

  const clickEventListener = (item) => {
    if (item.destination) {
      navigation.navigate(item.destination);
    } else {
      Alert.alert("No destination specified");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.contentList}
        data={options}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => clickEventListener(item)}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <TouchableOpacity
                style={styles.followButton}
                onPress={() => clickEventListener(item)}
              >
                <Text style={styles.followButtonText}>Explore now</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#ebf0f7",
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    marginLeft: 20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#ebf0f7",
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: "white",
    padding: 10,
    flexDirection: "row",
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#3399ff",
    fontWeight: "bold",
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: "center",
    color: "#6666ff",
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});
