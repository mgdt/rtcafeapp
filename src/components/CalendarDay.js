import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

export function CalendarDay({ date, state }) {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          color: state === "disabled" ? "gray" : "black",
        }}
      >
        {date.day}
      </Text>
    </View>
  );
}
