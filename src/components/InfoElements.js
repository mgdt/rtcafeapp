import React from "react";
import {StyleSheet, View, Text} from "react-native";


export function InfoElement(props) {
   return (
       <View styles={styles.container}>
            <Text style={styles.name}>
                {props.name}
            </Text>
           <Text style={styles.value}>
               {props.value}
           </Text>
       </View>
   )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
    },
    name: {
        fontFamily: "Cera Round Pro",
        fontSize: 14,
        marginBottom: 2,
        color: "#303030",
        textAlign: "center",
    },
    value: {
        fontFamily: "Cera Round Pro Bold",
        fontSize: 18,
        color: "#303030",
        textAlign: "center",
    }
});