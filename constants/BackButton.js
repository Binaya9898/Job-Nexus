import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8lf3opxmXXaa8to3VaLvu3ddpAzcKPa-zng&s",
        }} // Use your image URL here
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  image: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default BackButton;
