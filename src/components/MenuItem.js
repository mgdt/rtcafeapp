import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Block } from "./Block";
import { Button } from "./Button";

export function MenuItem(props) {
  const [quantity, setQuantity] = new useState(1);

  return (
    <Block style={[styles.container, props.style]}>
      <Image
        style={styles.image}
        source={{ uri: props.imageSource }}
        resizeMode={"stretch"}
      />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <Text style={styles.price}>{props.price + "₽"}</Text>
      <View style={styles.bottom}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.remove}
            onPress={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <Text style={styles.removeMinus}>–</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.add}
            onPress={() => {
              setQuantity(quantity + 1);
            }}
          >
            <Text style={styles.addPlus}>+</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          text1={"Добавить"}
          onPress={() => {
            const addedGoodsTemp = JSON.parse(JSON.stringify(props.addedGoods));

            if (addedGoodsTemp[props.id]) {
              addedGoodsTemp[props.id].count = quantity;
            } else {
              addedGoodsTemp[props.id] = {
                title: props.name,
                price: props.price,
                id: props.id,
                count: quantity,
              };
            }

            const sum = Object.values(addedGoodsTemp).reduce(
              (previousValue, good) => previousValue + +good.price * good.count,
              0
            );
            props.setMenuPrice(sum);

            props.setAddedGoods(addedGoodsTemp);
          }}
        ></Button>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 185,
    height: 185,
    marginBottom: 25,
    borderRadius: 500,
  },
  name: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 18,
    lineHeight: 20,
    color: "#EF473A",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 15,
    textAlign: "center",
  },
  price: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 20,
    color: "#303030",
    textAlign: "center",
  },
  bottom: {
    width: 280,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quantityContainer: {
    width: 115,
    height: 48,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    paddingHorizontal: 15,
  },
  button: {
    width: 155,
  },
  removeMinus: {
    fontFamily: "Cera Round Pro",
    fontSize: 22,
    color: "#303030",
  },
  addPlus: {
    fontFamily: "Cera Round Pro",
    fontSize: 22,
    color: "#303030",
  },
  quantity: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
  },
  remove: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
