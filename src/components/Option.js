import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export function Option(props) {
  return (
    <View style={[styles.option, props.style]}>
      <View style={styles.optionLeft}>
        <Text style={styles.optionTitle}>{props.title}</Text>
        <Text style={styles.optionText}>{props.text}</Text>
      </View>
      <View style={styles.optionRight}>
        <TouchableOpacity
          style={styles.optionRemove}
          onPress={() => {
            const addedGoodsTemp = JSON.parse(JSON.stringify(props.addedGoods));
            if (addedGoodsTemp[props.id].count <= 1) {
              delete addedGoodsTemp[props.id];
            } else {
              addedGoodsTemp[props.id].count--;
            }
            const sum = Object.values(addedGoodsTemp).reduce(
              (previousValue, good) => previousValue + +good.price * good.count,
              0
            );
            props.setMenuPrice(sum);
            props.setAddedGoods(addedGoodsTemp);
          }}
        >
          <Text style={styles.optionRemoveMinus}>–</Text>
        </TouchableOpacity>
        <View style={styles.value}>
          <Text style={styles.valueText}>{props.count}</Text>
        </View>
        <TouchableOpacity
          style={styles.optionAdd}
          onPress={() => {
            const addedGoodsTemp = JSON.parse(JSON.stringify(props.addedGoods));
            addedGoodsTemp[props.id].count++;

            const sum = Object.values(addedGoodsTemp).reduce(
              (previousValue, good) => previousValue + +good.price * good.count,
              0
            );
            props.setMenuPrice(sum);
            props.setAddedGoods(addedGoodsTemp);
          }}
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
