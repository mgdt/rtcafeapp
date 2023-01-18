import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export function Radio(props) {
  const [isSelected, setIsSelected] = useState(props.selected ? true : false);

  let radioStyles, radioInnerStyles;

  if (isSelected) {
    radioStyles = [styles.radio, styles.radioActive];
    radioInnerStyles = [styles.radioInner, styles.radioInnerActive];
  } else {
    radioStyles = styles.radio;
    radioInnerStyles = styles.radioInner;
  }

  return (
    <Pressable style={[styles.container, props.style]} onPress={props.onPress}>
      <View
        style={[
          styles.radio,
          props.selected ? styles.radioActive : "",
          props.hiddenCircle ? styles.hideRadio : "",
        ]}
      >
        <View
          style={[
            styles.radioInner,
            props.selected ? styles.radioInnerActive : "",
          ]}
        ></View>
      </View>
      <Text
        style={[styles.text, props.hiddenCircle ? styles.hideRadioText : ""]}
      >
        {props.children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    display: "flex",
    flexDirection: "row",
  },
  radio: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginRight: 15,
  },
  radioInner: {
    display: "none",
    width: 12,
    height: 12,
    borderRadius: 10000,
    backgroundColor: "#EF473A",
  },
  text: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    color: "#303030",
  },
  radioActive: {
    borderColor: "#EF473A",
  },
  radioInnerActive: {
    display: "flex",
  },
  hideRadio: {
    display: "none",
  },
  hideRadioText: {
    textAlign: "center",
  },
});
