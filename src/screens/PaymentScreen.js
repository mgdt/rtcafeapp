import React, { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { WebView } from "react-native-webview";

export function PaymentScreen({ paymentLink, setScreen }) {
  const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.webView}
        // automaticallyAdjustContentInsets={false}
        source={{ uri: paymentLink }}
        // source={{ uri: "https://rtcafe.ru" }}
        onNavigationStateChange={(e) => {
          if (
            e.title ==
            "Tinkoff Pay - способ оплаты покупок онлайн через мобильное приложение Tinkoff"
          ) {
            goback();
          }
          if (e.url == "https://rtcafe.ru/sale_ps_success/") {
            setScreen("success");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    backgroundColor: "white",
    display: "flex",
    flex: 1,
    height: "100%",
  },
  webView: {
    height: 600,
    // flex: 1,
  },
});
