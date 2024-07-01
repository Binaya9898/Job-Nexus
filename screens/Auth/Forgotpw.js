import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import SERVER from "../../constants/server";

export default function Forgotpw() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: `${SERVER.imageUrl}/password/reset` }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
