import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Favourite = () => {
  const items = [
    {
      id: 1,
      avatar: "https://www.bootdey.com/img/Content/avatar/avatar7.png",
      title: "Item 1",
      description: "Description for item 1",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
      buttons: [
        {
          title: "Button 1",
          onPress: () => {},
        },
        {
          title: "Button 2",
          onPress: () => {},
        },
      ],
    },
    {
      id: 2,
      avatar: "https://www.bootdey.com/img/Content/avatar/avatar2.png",
      title: "Item 1",
      description: "Description for item 1",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
      buttons: [
        {
          title: "Button 1",
          onPress: () => {},
        },
        {
          title: "Button 2",
          onPress: () => {},
        },
      ],
    },
    {
      id: 3,
      avatar: "https://www.bootdey.com/img/Content/avatar/avatar7.png",
      title: "Item 1",
      description: "Description for item 1",
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
      buttons: [
        {
          title: "Button 1",
          onPress: () => {},
        },
        {
          title: "Button 2",
          onPress: () => {},
        },
      ],
    },
    {
      id: 4,
      avatar: "https://www.bootdey.com/img/Content/avatar/avatar7.png",
      title: "Item 1",
      description: "Description for item 1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWhgJJG9oTxy-VPIWn3TPLf8usxWa_fFVMTCHAta8obA&s",
      buttons: [
        {
          title: "Button 1",
          onPress: () => {},
        },
        {
          title: "Button 2",
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.image} />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <FontAwesome
                  name={item.isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color="red"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => handleDetail(item)}
              >
                <Text style={styles.detailsButtonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Favourite;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  detailsButton: {
    marginTop: 5,
    backgroundColor: "#39B68D",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignSelf: "center",
  },
  detailsButtonText: {
    color: "#fff",
  },
  favoriteButton: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
