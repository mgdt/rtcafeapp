import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

export function InputCertificate(props) {
  // const [value, setValue] = useState(null);

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.header}>
        У Вас есть подарочный{"\n"}
        сертификат?
      </Text>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          // keyboardType={"numeric"}
          placeholder={"Введите номер"}
          onChangeText={props.setSertNumber}
          value={props.sertNumber}
          autoCapitalize={"none"}
          autoComplete={"off"}
          autoCorrect={false}
        />
        <TouchableOpacity onPress={props.onPress}>
          <Text style={styles.text}>Применить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
  },
  header: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 10,
    color: "#EF473A",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#929EB1",
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
  },
  input: {
    width: 160,
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    borderWidth: 0,
    backgroundColor: "transparent",
    height: 42,
  },
  text: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    color: "#EF473A",
  },
});
