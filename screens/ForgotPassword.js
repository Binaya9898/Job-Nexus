import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: "http://192.168.1.65:8000/password/reset" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => <Text>Loading...</Text>}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  webview: {
    flex: 1,
  },
});
