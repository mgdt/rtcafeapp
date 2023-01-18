import React from "react";
import { StyleSheet, View } from "react-native";
import { TableBig } from "./TableBig";
import { Table } from "./Table";

export function Tables({ tables, tableNumber, setTableNumber }) {
  return (
    <View style={styles.container}>
      <TableBig
        disabled={tables["4"]}
        onPress={() => {
          setTableNumber("4");
        }}
        active={tableNumber == "4"}
      >
        4
      </TableBig>
      <View style={styles.tableLine}>
        <Table
          disabled={tables["3"]}
          style={styles.tableLeft}
          onPress={() => {
            setTableNumber("3");
          }}
          active={tableNumber == "3"}
        >
          3
        </Table>
        <Table
          disabled={tables["5"]}
          style={styles.tableRight}
          onPress={() => {
            setTableNumber("5");
          }}
          active={tableNumber == "5"}
        >
          5
        </Table>
      </View>
      <View style={styles.tableLine}>
        <Table
          disabled={tables["2"]}
          style={styles.tableLeft}
          onPress={() => {
            setTableNumber("2");
          }}
          active={tableNumber == "2"}
        >
          2
        </Table>
        <Table
          disabled={tables["6"]}
          style={styles.tableRight}
          onPress={() => {
            setTableNumber("6");
          }}
          active={tableNumber == "6"}
        >
          6
        </Table>
      </View>
      <View style={styles.tableLine}>
        <Table
          disabled={tables["1"]}
          style={styles.tableLeft}
          onPress={() => {
            setTableNumber("1");
          }}
          active={tableNumber == "1"}
        >
          1
        </Table>
        <Table
          disabled={tables["7"]}
          style={styles.tableRight}
          onPress={() => {
            setTableNumber("7");
          }}
          active={tableNumber == "7"}
        >
          7
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: 250,
    height: 630,
    justifyContent: "space-between",
    marginBottom: 45,
  },
  tableLine: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tableLeft: {
    width: 95,
  },
  tableRight: {
    width: 60,
  },
  tableBottomSmall: {
    width: 60,
  },
});
