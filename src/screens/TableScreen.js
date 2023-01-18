import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StepHeader } from "../components/StepHeader";
import { Block } from "../components/Block";
import { Option } from "../components/OptionTable";
import { Button } from "../components/Button";
import { Tables } from "../components/Tables/Tables";
import { getTables } from "../logic/getTables";
import { formatDateTables } from "../helpers/formatDateTables";
import { formatDateResult } from "../helpers/formatDateResult";

export function TableScreen({
  setScreen,
  idTrip,
  bookingDate,
  tableNumber,
  setTableNumber,
  tripPrice,
  currentTrip,
  adultsCount,
  setAdultsCount,
  childsCount,
  setChildsCount,
  tablesSizes,
  setTablesSizes,
  ticketPrice,
}) {
  const [tables, setTables] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      const tables = await getTables(idTrip, formatDateTables(bookingDate));
      const disabledTables = {};
      tables.tripInfo.forEach((table) => {
        disabledTables[table.table] = true;
      });
      setTables(disabledTables);
      const tableSizesTemp = tables.tables;
      tableSizesTemp.push({
        number: "",
        min: 4,
        max: 4,
      });
      setTablesSizes(tableSizesTemp);
    };
    fetchData();
  }, [idTrip]);

  return (
    <View style={styles.container}>
      <StepHeader
        goBack={() => {
          setScreen("date");
        }}
        goForward={() => {
          setScreen("menu");
        }}
        nextDisabled={tableNumber == ""}
      >
        шаг второй
      </StepHeader>
      <Text style={styles.screenHeader}>Выберите столик</Text>
      <Tables
        tables={tables}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
      />
      {/* <View>
        <Text>{JSON.stringify(tablesSizes)}</Text>
      </View> */}
      <Block style={[tableNumber == "" ? styles.hidden : ""]}>
        <View style={styles.resultTop}>
          <Text style={styles.resultHeader}>
            Вы выбрали столик №{tableNumber}
          </Text>
          <Text style={styles.resultNote}>
            За столиком № {tableNumber} могут{"\n"}
            разместиться до{" "}
            {tablesSizes.find((table) => table.number == tableNumber).max}{" "}
            гостей.{"\n"}
            Минимальная оплата для{"\n"}
            бронирования — за{" "}
            {tablesSizes.find((table) => table.number == tableNumber).min}{" "}
            человека.
          </Text>
        </View>
        <View style={styles.resultMiddle}>
          <View style={styles.resultMiddleTop}>
            <View style={styles.resultMiddleText}>
              <Text style={styles.resultMiddleTitle}>Дата:</Text>
              <Text style={styles.resultMiddleValue}>
                {formatDateResult(bookingDate)}
              </Text>
              {/* <Text>{JSON.stringify(bookingDate)}</Text> */}
            </View>
            <View style={styles.resultMiddleText}>
              <Text style={styles.resultMiddleTitle}>Время:</Text>
              <Text style={styles.resultMiddleValue}>{currentTrip.start}</Text>
            </View>
          </View>
          <View>
            <Option
              title={"Количество гостей"}
              text={`Бронь от ${
                tablesSizes.find((table) => table.number == tableNumber).min
              } гостей`}
              style={styles.marginBottom}
              setCount={setAdultsCount}
              count={adultsCount}
              tableNumber={tableNumber}
              min={tablesSizes.find((table) => table.number == tableNumber).min}
              max={
                tablesSizes.find((table) => table.number == tableNumber).max -
                childsCount
              }
            ></Option>
            <Option
              title={"Дети до 4-х лет"}
              text={"Бесплатно сверх\n" + "минимальной оплаты"}
              min={0}
              setCount={setChildsCount}
              count={childsCount}
              tableNumber={tableNumber}
              max={
                tablesSizes.find((table) => table.number == tableNumber).max -
                adultsCount
              }
            ></Option>
          </View>
        </View>
        <Text style={styles.resultPriceText}>Всего к оплате за вход:</Text>
        <Text style={styles.resultPrice}>{ticketPrice} ₽</Text>
      </Block>
      <Button
        disabled={tableNumber == ""}
        style={[tableNumber == "" ? styles.buttonDisabled : ""]}
        text1={"Перейдем к меню"}
        text2={"шаг третий"}
        onPress={() => {
          setScreen("menu");
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonDisabled: {
    opacity: 0.5,
  },
  tables: {
    marginBottom: 44,
  },
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  screenHeader: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 22,
    lineHeight: 32,
    marginBottom: 35,
    color: "#303030",
  },
  resultTop: {
    display: "flex",
    alignItems: "center",
    width: 250,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C4C4C4",
  },
  resultHeader: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 10,
    color: "#303030",
    textAlign: "center",
  },
  resultNote: {
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#888888",
  },
  resultMiddle: {
    display: "flex",
    alignItems: "center",
    width: 250,
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C4C4C4",
    marginBottom: 20,
  },
  resultMiddleTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 25,
  },
  resultMiddleText: {
    display: "flex",
    flexDirection: "row",
  },
  resultMiddleTitle: {
    fontFamily: "Cera Round Pro",
    fontSize: 16,
    lineHeight: 23,
    color: "#303030",
  },
  resultMiddleValue: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
    lineHeight: 23,
    marginLeft: 5,
    color: "#303030",
  },
  marginBottom: {
    marginBottom: 25,
  },
  resultPriceText: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 14,
    lineHeight: 18,
    color: "#303030",
  },
  resultPrice: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 52,
    lineHeight: 68,
    color: "#EF473A",
  },
  hidden: {
    display: "none",
  },
});
