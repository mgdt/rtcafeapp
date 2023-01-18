import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function MenuCategory(props) {
  //   const [isSelected, setIsSelected] = useState(props.selected ? true : false);

  //   function setStatus() {
  //     switch (isSelected) {
  //       case true:
  //         setIsSelected(false);
  //         break;
  //       case false:
  //         setIsSelected(true);
  //         break;
  //     }
  //   }

  //   let categoryStyles;
  //   let categoryTextStyles;

  //   if (isSelected === props.selected) {
  //     categoryStyles = [styles.category, styles.categoryActive, props.style];
  //     categoryTextStyles = [styles.text, styles.textActive];
  //   } else {
  //     categoryStyles = [styles.category, props.style];
  //     categoryTextStyles = styles.text;
  //   }

  return (
    <TouchableOpacity
      style={[styles.category, props.selected ? styles.categoryActive : ""]}
      onPress={() => {
        props.setActiveCat(props.id);
      }}
    >
      <Text style={[styles.text, props.selected ? styles.textActive : ""]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    borderColor: "#EF473A",
    borderWidth: 1,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginRight: 15,
  },
  text: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 18,
    lineHeight: 18,
    color: "#EF473A",
  },
  categoryActive: {
    backgroundColor: "#EF473A",
  },
  textActive: {
    color: "#FFFFFF",
  },
});
