import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export function TableBig(props) {
  let disabledStyles, activeStyles, hiddenStyles, textStyles;

  switch (props.disabled) {
    case true:
      disabledStyles = styles.disabled;
      hiddenStyles = styles.hidden;
      textStyles = styles.textActive;

      break;
    default:
      disabledStyles = undefined;

      break;
  }

  switch (props.active) {
    case true:
      activeStyles = styles.active;
      hiddenStyles = styles.hidden;
      textStyles = styles.textActive;

      break;
    default:
      activeStyles = undefined;

      break;
  }

  return (
    <TouchableOpacity
      style={[styles.table]}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <View
        style={[
          styles.tableElem,
          styles.tableTop,
          disabledStyles,
          activeStyles,
        ]}
      ></View>
      <View style={styles.tableBottom}>
        <View
          style={[
            styles.tableElem,
            styles.tableBotLeft,
            disabledStyles,
            activeStyles,
          ]}
        >
          <View
            style={[
              styles.innerBackground,
              disabledStyles,
              activeStyles,
              hiddenStyles,
            ]}
          ></View>
        </View>
        <View
          style={[
            styles.tableElem,
            styles.tableBotCenter,
            disabledStyles,
            activeStyles,
          ]}
        >
          <Text style={[styles.tableText, textStyles]}>{props.children}</Text>
        </View>
        <View
          style={[
            styles.tableElem,
            styles.tableBotRight,
            disabledStyles,
            activeStyles,
          ]}
        >
          <View
            style={[
              styles.innerBackground,
              disabledStyles,
              activeStyles,
              hiddenStyles,
            ]}
          ></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  table: {
    position: "relative",
    width: "100%",
    height: 90,
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    height: 40,
  },
  tableBotLeft: {
    width: 60,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 3,
    borderTopWidth: 0,
    height: "100%",
  },
  tableBotRight: {
    width: 60,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 12,
    borderTopWidth: 0,
    height: "100%",
  },
  tableBotCenter: {
    width: 115,
    height: 30,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  tableText: {
    fontSize: 18,
    fontFamily: "Cera Round Pro Bold",
    color: "#EF473A",
  },
  innerBackground: {
    backgroundColor: "#F9F9F9",
    width: 56,
    height: 2,
    position: "absolute",
    top: -2,
    left: 0,
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
  hidden: {
    opacity: 0,
  },
  textActive: {
    color: "#FFFFFF",
  },
});
