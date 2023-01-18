import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/images/SuccessScreen/logo.svg";
import Heart from "../../assets/images/LoadingScreen/heart.svg";

export function SuccessScreen({ setScreen, clearApp }) {
  useEffect(() => {
    clearApp();
  }, []);

  return (
    <LinearGradient style={styles.container} colors={["#EF473A", "#CB2D3E"]}>
      <Logo style={styles.logo} />
      <Text style={styles.header}>
        Успешная оплата. {"\n"}
        Благодарим за заказ!
      </Text>
      <Heart style={styles.heart} />
      <Text style={styles.text}>
        Письмо с подтверждением заказа{"\n"}
        Придет к Вам на почту.{"\n"}
        {"\n"}
        За день до рейса наш оператор{"\n"}
        свяжется с Вами и подробно{"\n"}
        расскажет про посадку.
      </Text>
      <Heart style={styles.heart} />
      <Text style={styles.team}>КОМАНДА ROMANTIC TRAM CAFE</Text>
      <TouchableOpacity
        onPress={() => {
          setScreen("date");
        }}
        style={styles.backBtn}
      >
        <Text style={styles.backBtnText}>Вернуться к выбору столика</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 10,
    marginTop: 65,
  },
  backBtnText: {
    color: "white",
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    color: "#F9F9F9",
  },
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    paddingTop: "20%",
    paddingBottom: "72%",
  },
  heart: {
    marginBottom: 20,
  },
  logo: {
    marginBottom: 50,
  },
  header: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 26,
    lineHeight: 31,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  text: {
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    lineHeight: 16,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  team: {
    fontFamily: "Cera Round Pro Light",
    fontSize: 12,
    lineHeight: 12,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
