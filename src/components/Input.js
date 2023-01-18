import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

export function Input(props) {
  // const [value, setValue] = useState(null);

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.name}>{props.name}</Text>
      <TextInput
        style={[styles.input, props.error ? styles.inputError : ""]}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        onChangeText={props.setValue}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        autoComplete={"off"}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
  },
  name: {
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: "#929EB1",
  },
  input: {
    display: "flex",
    height: 40,
    justifyContent: "center",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#929EB1",
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "red",
  },
});
