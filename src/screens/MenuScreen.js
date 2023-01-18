import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { StepHeader } from "../components/StepHeader";
import { Button } from "../components/Button";
import { MenuCategory } from "../components/MenuCategory";
import { MenuItem } from "../components/MenuItem";

export function MenuScreen({
  setScreen,
  menuCats,
  menuGoods,
  addedGoods,
  setAddedGoods,
  menuPrice,
  setMenuPrice,
}) {
  const [activeCat, setActiveCat] = useState(menuCats[0].id_category);
  const [activeGoods, setActiveGoods] = useState(
    menuGoods.filter((good) => good.category == menuCats[0].id_category)
  );

  useEffect(() => {
    setActiveGoods(menuGoods.filter((good) => good.category == activeCat));
  }, [activeCat]);

  let paddingValue =
    (useWindowDimensions().width - useWindowDimensions().width * 0.9) / 2;

  let paddingLeftStyle = StyleSheet.create({
    paddingLeft: {
      paddingLeft: paddingValue,
    },
  });

  return (
    <View style={styles.container}>
      <StepHeader
        goBack={() => {
          setScreen("table");
        }}
        goForward={() => {
          setScreen("booking");
        }}
      >
        шаг третий
      </StepHeader>
      <Text style={styles.screenHeader}>
        Добавьте блюда{"\n"}
        по предзаказу
      </Text>
      <Text style={styles.menuText}>
        Мы готовим эти блюда заранее{"\n"}и подвозим свежими на борт к вашему
        {"\n"}
        рейсу. Заказать можно прямо сейчас{"\n"}
        или за день до рейса, мы позвоним{"\n"}и согласуем детали.
      </Text>
      <Text style={styles.menuText2}>
        Напитки и десерты будут{"\n"}
        представлены на борту.
      </Text>
      <TouchableOpacity
        onPress={() => {
          setScreen("booking");
        }}
        style={styles.menuDelivery}
      >
        <Text style={styles.menuDeliveryText}>Не хочу заказывать еду</Text>
      </TouchableOpacity>
      <ScrollView
        style={[styles.menuCategories, paddingLeftStyle.paddingLeft]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {menuCats.map((cat, i) => {
          return (
            <MenuCategory
              key={i}
              name={cat.title}
              id={cat.id_category}
              selected={cat.id_category == activeCat}
              setActiveCat={setActiveCat}
            ></MenuCategory>
          );
        })}
      </ScrollView>
      <View style={styles.menu}>
        {activeGoods.map((good, i) => {
          return (
            <MenuItem
              name={good.title}
              description={good.description}
              price={good.price}
              imageSource={good.photo}
              id={good.id_goods}
              key={i}
              addedGoods={addedGoods}
              setAddedGoods={setAddedGoods}
              menuPrice={menuPrice}
              setMenuPrice={setMenuPrice}
            ></MenuItem>
          );
        })}
      </View>
      <Button
        text1={"Завершим бронирование"}
        text2={"последний штрих"}
        onPress={() => {
          setScreen("booking");
        }}
        style={styles.button}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  screenHeader: {
    fontFamily: "Cera Round Pro Bold",
    textAlign: "center",
    fontSize: 22,
    lineHeight: 24,
    marginBottom: 30,
    color: "#303030",
  },
  menuText: {
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    color: "#303030",
    marginBottom: 20,
  },
  menuText2: {
    fontFamily: "Cera Round Pro Medium",
    color: "#303030",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  menuDelivery: {
    width: 280,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    marginBottom: 40,
  },
  menuDeliveryText: {
    fontFamily: "Cera Round Pro",
    fontSize: 18,
    lineHeight: 20,
    textAlign: "center",
    color: "#C4C4C4",
  },
  menuCategories: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  menu: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
});
