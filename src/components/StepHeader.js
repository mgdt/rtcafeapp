import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ArrowLeft from "../../assets/images/arrow-left.svg";
import ArrowRight from "../../assets/images/arrow-right.svg";

export function StepHeader(props) {
  let headerNextStyles;

  props.goForward
    ? (headerNextStyles = styles.headerNext)
    : (headerNextStyles = styles.hidden);

  return (
    <View style={[styles.header, props.styles]}>
      <TouchableOpacity style={styles.headerPrev} onPress={props.goBack}>
        <ArrowLeft style={styles.headerArrowLeft} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.children}</Text>
      <TouchableOpacity
        disabled={props.nextDisabled}
        onPress={props.goForward}
        style={[
          styles.headerNextBtn,
          props.nextHidden ? styles.nextHidden : "",
        ]}
      >
        <ArrowRight
          style={[
            headerNextStyles,
            props.nextDisabled ? styles.arrowDisabled : "",
            props.nextHidden ? styles.nextHidden : "",
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerNextBtn: {
    padding: 10,
  },
  headerPrev: {
    padding: 10,
  },
  arrowDisabled: {
    opacity: 0.5,
  },
  header: {
    width: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontFamily: "Cera Round Pro Black",
    fontSize: 12,
    lineHeight: 12,
    color: "#EF473A",
    textTransform: "uppercase",
    flexGrow: 1,
    textAlign: "center",
  },
  hidden: {
    display: "none",
  },
  nextHidden: {
    opacity: 0,
  },
});
