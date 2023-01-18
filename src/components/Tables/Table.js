import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export function Table(props) {
  let disabledStyles, activeStyles, textStyles;

  switch (props.disabled) {
    case true:
      disabledStyles = styles.disabled;
      textStyles = styles.textActive;

      break;
    default:
      disabledStyles = undefined;

      break;
  }

  switch (props.active) {
    case true:
      activeStyles = styles.active;
      textStyles = styles.textActive;

      break;
    default:
      activeStyles = undefined;

      break;
  }

  return (
    <TouchableOpacity
      style={[styles.table, props.style]}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View
        style={[
          styles.tableElem,
          styles.tableTop,
          props.stylesTop,
          disabledStyles,
          activeStyles,
        ]}
      ></View>
      <View
        style={[
          styles.tableElem,
          styles.tableCenter,
          props.stylesCenter,
          disabledStyles,
          activeStyles,
        ]}
      >
        <Text style={[styles.tableText, textStyles]}>{props.children}</Text>
      </View>
      <View
        style={[
          styles.tableElem,
          styles.tableBottom,
          props.stylesBottom,
          disabledStyles,
          activeStyles,
        ]}
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  table: {
    position: "relative",
  },
  tableElem: {
    borderWidth: 2,
    borderColor: "#EF473A",
    position: "relative",
  },
  tableTop: {
    width: "100%",
    height: 50,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableBottom: {
    height: 50,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  tableText: {
    fontSize: 18,
    fontFamily: "Cera Round Pro Bold",
    color: "#EF473A",
  },
  tableCenter: {
    height: 30,
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  disabled: {
    backgroundColor: "#E9E9E9",
    borderWidth: 0,
    color: "#FFFFFF",
  },
  active: {
    backgroundColor: "#EF473A",
    borderWidth: 0,
  },
  textActive: {
    color: "#FFFFFF",
  },
});
