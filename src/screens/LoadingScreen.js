import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Logo from "../../assets/images/LoadingScreen/logo.svg";
import Heart from "../../assets/images/LoadingScreen/heart.svg";
import { LinearGradient } from "expo-linear-gradient";

export function LoadingScreen() {
  return (
    <LinearGradient style={styles.container} colors={["#EF473A", "#CB2D3E"]}>
      <Logo style={styles.logo}></Logo>
      <View style={styles.bottom}>
        <View style={styles.top}>
          <Heart style={styles.heartFirst}></Heart>
          <Heart style={styles.heartSecond}></Heart>
          <Heart style={styles.heartThird}></Heart>
        </View>
        <View style={styles.loadingTextWrapper}>
          <Text style={styles.loadingText}>
            Загружаем меню{"\n"}и свободные столики
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    position: "relative",
  },
  bottom: {
    alignItems: "center",
    position: "absolute",
    bottom: "8%",
  },
  loadingTextWrapper: {
    width: 200,
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    color: "#303030;",
  },
  top: {
    width: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  loadingText: {
    textAlign: "center",
  },
  heartFirst: {
    opacity: 0.4,
  },
  heartSecond: {
    opacity: 0.7,
  },
});
