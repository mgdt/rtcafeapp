import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function Button(props) {
  let text2styles;

  props.text2
    ? (text2styles = styles.buttonText2)
    : (text2styles = styles.none);

  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <LinearGradient
        style={{
          width: "100%",
          paddingVertical: 13,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          height: props.height ? props.height : "auto",
        }}
        colors={["#EF473A", "#CB2D3E"]}
      >
        <Text style={styles.buttonText1}>{props.text1}</Text>
        <Text style={text2styles}>{props.text2}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    width: 280,
    backgroundColor: "#EF473A",
    borderRadius: 15,
  },
  buttonText1: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 18,
    color: "#F9F9F9",
  },
  buttonText2: {
    fontFamily: "Cera Round Pro Black",
    fontSize: 12,
    lineHeight: 12,
    color: "#F9F9F9",
    opacity: 0.25,
    textTransform: "uppercase",
    marginTop: 5,
  },
  none: {
    display: "none",
  },
});
