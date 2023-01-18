import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";

export function Option(props) {
  // const prevTableNumberRef = useRef();

  useEffect(() => {
    // prevTableNumberRef.current = props.tableNumber;
    if (
      props.count == 0 ||
      props.count > props.max ||
      props.count < props.min
    ) {
      props.setCount(props.min);
    }
  }, [props.tableNumber]);

  return (
    <View style={[styles.option, props.style]}>
      <View style={styles.optionLeft}>
        <Text style={styles.optionTitle}>{props.title}</Text>
        <Text style={styles.optionText}>{props.text}</Text>
      </View>
      <View style={styles.optionRight}>
        <TouchableOpacity
          onPress={() => {
            if (props.count > props.min) {
              props.setCount(props.count - 1);
            }
          }}
          style={styles.optionRemove}
        >
          <Text style={styles.optionRemoveMinus}>–</Text>
        </TouchableOpacity>
        <View style={styles.value}>
          <Text style={styles.valueText}>{props.count}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (props.count < props.max) {
              props.setCount(+props.count + 1);
            }
          }}
          style={styles.optionAdd}
        >
          <Text style={styles.optionAddPlus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    width: 250,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  optionLeft: {
    display: "flex",
  },
  optionTitle: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 5,
    color: "#303030",
  },
  optionText: {
    fontFamily: "Cera Round Pro",
    fontSize: 10,
    lineHeight: 11,
    color: "rgba(48, 48, 48, 0.7)",
  },
  optionRight: {
    width: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 5,
  },
  optionRemoveMinus: {
    fontFamily: "Cera Round Pro",
    fontSize: 22,
    color: "#303030",
  },
  optionAddPlus: {
    fontFamily: "Cera Round Pro",
    fontSize: 22,
    color: "#303030",
  },
  valueText: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
  },
});
