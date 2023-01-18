import React from "react";
import {StyleSheet, View} from "react-native";

export function Block(props) {
    return (
        <View style={[styles.block, props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        display: "flex",
        alignItems: "center",
        width: "90%",
        elevation: 8,
        borderRadius: 15,
        backgroundColor: "white",
        shadowColor: "#333333",
        marginBottom: 40,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowRadius: 15,
        shadowOpacity: 0.05,
        paddingVertical: 20,
    },
});