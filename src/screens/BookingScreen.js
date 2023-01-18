import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Block } from "../components/Block";
import { Option } from "../components/Option";
import { Button } from "../components/Button";
import { StepHeader } from "../components/StepHeader";
import { InfoElement } from "../components/InfoElements";
import { Radio } from "../components/Radio";
import { Input } from "../components/Input";
import { InputCertificate } from "../components/InputCertificate";
import { formatDateResult } from "../helpers/formatDateResult";
import { formatDateTables } from "../helpers/formatDateTables";
import { payOrder } from "../logic/payOrder";
import { checkSert } from "../logic/checkSert";
import { disableSert } from "../logic/disableSert";

export function BookingScreen({
  setScreen,
  bookingDate,
  tableNumber,
  currentTrip,
  adultsCount,
  childsCount,
  ticketPrice,
  addedGoods,
  setAddedGoods,
  menuPrice,
  setMenuPrice,
  onlyTicket,
  setOnlyTicket,
  totalPrice,
  clearApp,
  comment,
  setComment,
  fio,
  setFio,
  phone,
  setPhone,
  email,
  setEmail,
  setPaymentLink,
  paymentLink,
}) {
  const [paymentErr, setPaymentErr] = useState("");

  const [fioErr, setFioErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [sertNumber, setSertNumber] = useState("");

  function buildCart(goods) {
    const cart = [];
    for (let id in goods) {
      let good = goods[id];

      cart.push({
        idGoods: id,
        item: good.title,
        price: good.price,
        priceInCart: good.price * good.count,
        counter: good.count,
        cartSum: `${good.title}:${good.count}шт`,
      });
    }

    return cart;
  }

  async function handleSubmitClick() {
    let errors = 0;

    if (fio.length < 1) {
      setFioErr(true);
      errors++;
    } else {
      setFioErr(false);
    }

    if (phone.length < 1) {
      setPhoneErr(true);
      errors++;
    } else {
      setPhoneErr(false);
    }

    if (email.length < 1) {
      setEmailErr(true);
      errors++;
    } else {
      setEmailErr(false);
    }

    if (errors > 0) {
      return false;
    }

    const additionalInfo = comment;
    const adult = +adultsCount;
    const bookingDate_ = formatDateTables(bookingDate);
    const cartItem = buildCart(addedGoods);
    const child = +childsCount;
    const email_ = email;
    const fullPrice = +totalPrice;
    const idTrip = currentTrip.id;
    const name = fio.split(" ")[0];
    const onlyTicket_ = +onlyTicket;
    const phone_ = phone;
    const surname = fio.split(" ")[1];
    const table = tableNumber;

    const result = await payOrder(
      additionalInfo,
      adult,
      bookingDate_,
      cartItem,
      child,
      email_,
      fullPrice,
      idTrip,
      name,
      onlyTicket_,
      phone_,
      surname,
      table
    );

    if (result["error"]) {
      Alert.alert(
        "Ошибка",
        "Пока вы делали заказ, столик уже заняли. Выберите другой столик или рейс!",
        [{ text: "ОК" }]
      );
    } else {
      setPaymentLink(result);
      setScreen("payment");
    }
  }

  async function handleSertClick() {
    const result = await checkSert(sertNumber);
    if (!result) {
      Alert.alert("Не удалось применить", "Напишите нам в чат на сайте", [
        { text: "ОК" },
      ]);
    } else {
      let errors = 0;

      if (fio.length < 1) {
        setFioErr(true);
        errors++;
      } else {
        setFioErr(false);
      }

      if (phone.length < 1) {
        setPhoneErr(true);
        errors++;
      } else {
        setPhoneErr(false);
      }

      if (email.length < 1) {
        setEmailErr(true);
        errors++;
      } else {
        setEmailErr(false);
      }

      if (errors > 0) {
        return false;
      }

      const additionalInfo = comment;
      const adult = +adultsCount;
      const bookingDate_ = formatDateTables(bookingDate);
      const cartItem = buildCart(addedGoods);
      const child = +childsCount;
      const email_ = email;
      const idTrip = currentTrip.id;
      const name = fio.split(" ")[0];
      const onlyTicket_ = +onlyTicket;
      const phone_ = phone;
      const surname = fio.split(" ")[1];
      const table = tableNumber;

      const result = await disableSert(
        additionalInfo,
        adult,
        bookingDate_,
        cartItem,
        child,
        email_,
        idTrip,
        name,
        onlyTicket_,
        phone_,
        surname,
        table,
        sertNumber
      );

      if (result.error) {
        Alert.alert(
          "Ошибка",
          "Пока вы делали заказ, столик уже заняли. Выберите другой столик или рейс!",
          [{ text: "ОК" }]
        );
      } else {
        setScreen("success");
      }
    }
  }

  return (
    <View style={styles.container}>
      <StepHeader
        goBack={() => {
          setScreen("menu");
        }}
        goForward={() => {
          setScreen("booking");
        }}
        nextHidden={true}
      >
        последний шаг
      </StepHeader>
      {/* <View>
        <Text>{JSON.stringify(currentTrip)}</Text>
      </View> */}
      <Text style={styles.header}>
        Завершите{"\n"}
        бронирование
      </Text>
      <Block style={styles.info}>
        <View style={styles.infoTop}>
          <InfoElement
            name={"Дата"}
            value={formatDateResult(bookingDate)}
          ></InfoElement>
          <InfoElement name={"Время"} value={currentTrip.start}></InfoElement>
          <InfoElement name={"Стол"} value={`№${tableNumber}`}></InfoElement>
        </View>
        <View style={styles.infoBottom}>
          <View style={styles.infoEl}>
            <Text style={styles.infoElTitle}>Взрослые:</Text>
            <Text style={styles.infoElValue}>{adultsCount}</Text>
          </View>
          <View style={styles.infoEl}>
            <Text style={styles.infoElTitle}>Дети до 4-ч лет:</Text>
            <Text style={styles.infoElValue}>{childsCount}</Text>
          </View>
        </View>
      </Block>
      <View style={styles.tickets}>
        <View style={styles.ticketsLeft}>
          <Text style={styles.ticketsText1}>Всего за входные билеты:</Text>
          <Text style={styles.ticketsText2}>Обязательно к оплате онлайн</Text>
        </View>
        <Text style={styles.menuPrice}>{ticketPrice} ₽</Text>
      </View>
      <Block
        style={[
          styles.menu,
          Object.values(addedGoods).length == 0 ? styles.emptyGoods : "",
        ]}
      >
        <Text style={styles.menuTitle}>Меню по предзаказу:</Text>
        {Object.values(addedGoods).length == 0 ? (
          <Text style={styles.emptyGoodsText}>Вы ничего не заказали</Text>
        ) : (
          Object.values(addedGoods).map((good, i) => {
            return (
              <Option
                title={good.title}
                key={i}
                text={`${good.price} ₽/шт`}
                style={styles.menuOption}
                count={good.count}
                id={good.id}
                setAddedGoods={setAddedGoods}
                addedGoods={addedGoods}
                setMenuPrice={setMenuPrice}
              ></Option>
            );
          })
        )}
      </Block>
      <View style={styles.menuPriceContainer}>
        <Text style={styles.menuPriceText}>Стоимость блюд:</Text>
        <Text style={styles.menuPrice}>{menuPrice} ₽</Text>
      </View>
      <View style={styles.paymentTypes}>
        <Radio
          style={styles.paymentType}
          selected={!onlyTicket}
          onPress={() => {
            setOnlyTicket(false);
          }}
        >
          Оплатить блюда онлайн
        </Radio>
        <Radio
          style={styles.paymentType}
          selected={onlyTicket}
          onPress={() => {
            setOnlyTicket(true);
          }}
        >
          Оплатить блюда на борту
        </Radio>
      </View>
      <View style={styles.middle}>
        <Input
          name={"ФИО*"}
          style={styles.input}
          autoCapitalize={"words"}
          setValue={setFio}
          value={fio}
          error={fioErr}
        />
        <Input
          name={"Телефон*"}
          style={styles.input}
          // keyboardType={"phone-pad"}
          setValue={setPhone}
          value={phone}
          error={phoneErr}
        />
        <Input
          name={"Email*"}
          style={styles.input}
          keyboardType={"email-address"}
          setValue={setEmail}
          value={email}
          autoCapitalize={"none"}
          error={emailErr}
        />
        <Input
          name={"Комментарий"}
          style={styles.input}
          setValue={setComment}
          value={comment}
        />
        <InputCertificate
          onPress={handleSertClick}
          sertNumber={sertNumber}
          setSertNumber={setSertNumber}
        />
      </View>
      <Radio style={styles.offer} hiddenCircle={true}>
        Нажимая на кнопку «Оплатить», вы соглашаетесь с{" "}
        <Text style={styles.offerText}>договором-офертой</Text>
      </Radio>
      <Button
        height={60}
        text1={`Оплатить ${totalPrice} ₽`}
        style={[sertNumber ? styles.payBtnDisabled : "", styles.payButton]}
        disabled={sertNumber}
        onPress={() => {
          handleSubmitClick();
          // clearApp();
          // setScreen("date");
          // await setScreen("success");
        }}
      ></Button>
      {/* <TouchableOpacity
        onPress={() => {
          clearApp();
          setScreen("date");
        }}
      >
        <Text>Touch ME to rerender</Text>
      </TouchableOpacity> */}
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
  payBtnDisabled: {
    opacity: 0.5,
  },
  header: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 22,
    lineHeight: 29,
    textAlign: "center",
    color: "#303030",
    marginBottom: 35,
  },
  infoTop: {
    width: 280,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#C4C4C4",
    marginBottom: 15,
  },
  infoBottom: {
    width: 280,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  infoEl: {
    display: "flex",
    flexDirection: "row",
  },
  infoElTitle: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    color: "#303030",
  },
  emptyGoodsText: {
    fontFamily: "Cera Round Pro",
  },
  infoElValue: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 14,
    color: "#303030",
    marginLeft: 4,
  },
  info: {
    marginBottom: 20,
  },
  tickets: {
    width: 280,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 40,
  },
  ticketsText1: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
    marginBottom: 3,
  },
  ticketsText2: {
    fontFamily: "Cera Round Pro Light",
    fontSize: 12,
  },
  menuTitle: {
    width: 280,
    fontFamily: "Cera Round Pro Bold",
    textAlign: "left",
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 20,
  },
  menu: {
    paddingTop: 30,
    paddingBottom: 15,
    marginBottom: 20,
  },
  emptyGoods: {
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  menuOption: {
    width: 280,
    marginBottom: 15,
  },
  menuPriceContainer: {
    width: 280,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuPriceText: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
  },
  menuPrice: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
    marginBottom: 30,
  },
  paymentType: {
    marginBottom: 15,
  },
  paymentTypes: {
    marginBottom: 15,
  },
  middle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingVertical: 30,
    borderTopColor: "#C4C4C4",
    borderTopWidth: 0.5,
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
  input: {
    marginBottom: 25,
  },
  offer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  offerText: {
    fontFamily: "Cera Round Pro Medium",
    color: "#EF473A",
  },
  payButton: {
    height: 60,
    justifyContent: "center",
  },
});
