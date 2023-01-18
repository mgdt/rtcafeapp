import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calendar, LocaleConfig, Day } from "react-native-calendars";
import Heart from "../../assets/images/DateScreen/heart.svg";
import ArrowLeft from "../../assets/images/DateScreen/arrow-left.svg";
import ArrowRight from "../../assets/images/DateScreen/arrow-right.svg";
import Saxo from "../../assets/images/DateScreen/saxo.svg";
import Mic from "../../assets/images/DateScreen/mic.svg";
import Percent from "../../assets/images/DateScreen/percent.svg";
import { Button } from "../components/Button";
import { Block } from "../components/Block";
import { getDates } from "../logic/getDates";
import { getTrips } from "../logic/getTrips";

function getMonth(date) {
  const month = date.getMonth();
  if (month == 0) return "ЯНВАРЬ";
  if (month == 1) return "ФЕВРАЛЬ";
  if (month == 2) return "МАРТ";
  if (month == 3) return "АПРЕЛЬ";
  if (month == 4) return "МАЙ";
  if (month == 5) return "ИЮНЬ";
  if (month == 6) return "ИЮЛЬ";
  if (month == 7) return "АВГУСТ";
  if (month == 8) return "СЕНТЯБРЬ";
  if (month == 9) return "ОКТЯБРЬ";
  if (month == 10) return "НОЯБРЬ";
  if (month == 11) return "ДЕКАБРЬ";
}

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  dayNamesShort: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
  today: "Сегодня",
};
LocaleConfig.defaultLocale = "ru";

function isEmpty(obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

export function DateScreen({
  setScreen,
  setBookingDate,
  setCalendarDates,
  calendarDates,
  setSelectedDay,
  selectedDay,
  setTrips,
  trips,
  tripsDisabled,
  setTripsDisabled,
  setIdTrip,
  idTrip,
  currentTrip,
  setCurrentTrip,
  setTableNumber,
  setTripPrice,
  initialDate,
  setInitialDate,
}) {
  useEffect(() => {
    if (isEmpty(calendarDates)) {
      const fetchData = async () => {
        const data = await getDates();
        setCalendarDates(data);
      };
      fetchData();
    }
  }, []);

  async function handleDayClick(day) {
    if (calendarDates[day.dateString]) {
      setInitialDate(day.dateString);
      const dates = Object.assign({}, calendarDates);
      if (selectedDay) {
        dates[selectedDay].customStyles.container.borderColor = "#A7D676";
        dates[selectedDay].customStyles.container.backgroundColor =
          "transparent";
        dates[selectedDay].customStyles.container.borderWidth = 2;
      }
      setSelectedDay(day.dateString);
      setTableNumber("");
      dates[day.dateString].customStyles.container.borderColor = "#A7D676";
      dates[day.dateString].customStyles.container.backgroundColor = "#A7D676";
      dates[day.dateString].customStyles.container.borderWidth = 2;
      setCalendarDates(dates);

      setTripsDisabled(true);
      setBookingDate(calendarDates[day.dateString].unixDate);
      const trips = await getTrips(calendarDates[day.dateString].unixDate);

      function calculateTripPrice(trip) {
        var price = +trip.trip_price;
        trip.properties.forEach(function (prop) {
          price = +price + +prop.trip_price;
        });
        return price;
      }

      const tripsFormated = [];
      trips.forEach((trip) => {
        tripsFormated.push({
          price: calculateTripPrice(trip),
          id: trip.id_trip,
          start: trip.trip_start,
          properties: trip.properties,
          trip: trip.trip,
        });
      });
      setTrips(tripsFormated);
      setTripsDisabled(false);

      setIdTrip(tripsFormated[0].id);
      setTripPrice(tripsFormated[0].price);
      setCurrentTrip(tripsFormated[0]);
    }
  }

  function handleTripClick(trip) {
    setIdTrip(trip.id);
    setCurrentTrip(trip);
    setTripPrice(trip.price);
    setTableNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Давайте забронируем {"\n"}
        для вас столик
      </Text>
      <Heart style={styles.heart}></Heart>
      <Text style={styles.stepText}>шаг первый</Text>
      <Text style={styles.dateText}>Выберите дату и время</Text>
      <View style={styles.calendar}>
        <Calendar
          // dayComponent={({ date, state }) => <Day date={date} state={state} />}
          initialDate={initialDate}
          renderArrow={(direction) => {
            if (direction == "left") {
              return <ArrowLeft />;
            }
            return <ArrowRight />;
          }}
          hideExtraDays={true}
          enableSwipeMonths={true}
          renderHeader={(date) => {
            return (
              <View style={styles.calendarHeader}>
                <Text style={styles.calendarMonth}>{getMonth(date)}</Text>
              </View>
            );
          }}
          firstDay={1}
          markingType={"custom"}
          markedDates={calendarDates}
          theme={{
            backgroundColor: "#f9f9f9",
            calendarBackground: "#f9f9f9",
            todayTextColor: "#303030",
            selectedDayBackgroundColor: "#00adf5",
            textDayHeaderFontFamily: "Cera Round Pro Bold",
            textDayFontFamily: "Cera Round Pro",
            textDayHeaderFontSize: 10,
            textDayFontSize: 14,
            "stylesheet.calendar.header": {
              dayTextAtIndex0: {
                color: "red",
              },
            },
          }}
          style={{
            backgroundColor: "#f9f9f9",
          }}
          onDayPress={(day) => {
            handleDayClick(day);
          }}
        />
      </View>
      <View style={styles.availability}>
        <View style={styles.available}>
          <View style={styles.greenCircle}></View>
          <Text style={styles.availabilityText}>Есть места</Text>
        </View>
        <View style={styles.unavailable}>
          <View style={styles.redCircle}></View>
          <Text style={styles.availabilityText}>Все места заняты</Text>
        </View>
      </View>
      <View
        style={[
          styles.timeContainer,
          tripsDisabled ? styles.timeContainerDisabled : "",
        ]}
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.timeTop}>
            {trips.map((trip, i) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.timeItem,
                    i === trips.length - 1 ? styles.lastTrip : "",
                  ]}
                  disabled={tripsDisabled}
                  key={trip.id}
                  onPress={() => {
                    handleTripClick(trip);
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {trip.properties.map((prop, i) => {
                      if (prop.id_trip == "62") {
                        return (
                          <Saxo
                            style={[
                              styles.tripProp,
                              i === trip.properties.length - 1
                                ? styles.lastTripProp
                                : "",
                            ]}
                            key={i}
                          />
                        );
                      } else if (prop.id_trip == "940") {
                        return (
                          <Percent
                            style={[
                              styles.tripProp,
                              i === trip.properties.length - 1
                                ? styles.lastTripProp
                                : "",
                            ]}
                            key={i}
                          />
                        );
                      } else if (prop.id_trip == "572") {
                        return (
                          <Mic
                            style={[
                              styles.tripProp,
                              i === trip.properties.length - 1
                                ? styles.lastTripProp
                                : "",
                            ]}
                            key={i}
                          />
                        );
                      }
                    })}
                  </View>
                  <Text
                    style={[
                      styles.timeText,
                      trip.id == idTrip ? styles.tripActive : "",
                    ]}
                  >
                    {trip.start}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {currentTrip.properties.find(
        (prop) =>
          prop.id_trip == 940 || prop.id_trip == 572 || prop.id_trip == 62
      ) && (
        <View style={styles.tripOptionsWrap}>
          {currentTrip.properties.find((prop) => prop.id_trip == 940) && (
            <View style={styles.tripOption}>
              <Percent />
              <Text style={styles.tripOptionText}>
                Акция! Билет 150р, вместо 300р!
              </Text>
            </View>
          )}
          {currentTrip.properties.find((prop) => prop.id_trip == 572) && (
            <View style={styles.tripOption}>
              <Mic />
              <Text style={styles.tripOptionText}>Экскурсия</Text>
            </View>
          )}
          {currentTrip.properties.find((prop) => prop.id_trip == 62) && (
            <View style={styles.tripOption}>
              <Saxo />
              <Text style={styles.tripOptionText}>Живая музыка</Text>
            </View>
          )}
        </View>
      )}
      <Block style={[!idTrip ? styles.chosenDisabled : "", styles.resultBlock]}>
        <Text style={styles.resultTitle}>Вы выбрали:</Text>
        <Text style={styles.resultDesc}>
          {currentTrip.trip}
          {"\n"}
          Ваше путешествие продлится{"\n"}1 час 30 минут.
        </Text>
        <Text style={styles.resultText}>
          Цена входного билета от 250 рублей{"\n"}с одного гостя (цена зависит
          от рейса)
        </Text>
        <Text style={styles.resultText2}>
          На рейсах без живой музыки{"\n"}и экскурсии звучит приятная{"\n"}
          фоновая музыка.
        </Text>
      </Block>
      <Button
        disabled={tripsDisabled}
        style={tripsDisabled ? styles.timeContainerDisabled : ""}
        onPress={() => {
          setScreen("table");
        }}
        text1={"Теперь выберем столик"}
        text2={"шаг второй"}
      ></Button>
    </View>
  );
}

let styles = StyleSheet.create({
  resultBlock: {
    paddingHorizontal: 10,
  },
  chosenDisabled: {
    display: "none",
  },
  tripProp: {
    marginRight: 5,
    height: 27,
  },
  lastTripProp: {
    marginRight: 0,
  },
  calendarHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
  calendarMonth: {
    fontSize: 18,
    color: "#303030",
    fontFamily: "Cera Round Pro Bold",
  },
  calendar: {
    marginBottom: 25,
    width: 300,
  },
  container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 26,
    lineHeight: 29,
    textAlign: "center",
    color: "#303030",
    marginBottom: 15,
  },
  heart: {
    marginBottom: 20,
  },
  stepText: {
    fontFamily: "Cera Round Pro Black",
    color: "#EF473A",
    fontSize: 12,
    lineHeight: 12,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  dateText: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 22,
    lineHeight: 32,
    textAlign: "center",
    marginBottom: 35,
    color: "#303030",
  },
  availability: {
    width: 280,
    display: "flex",
    // display: 'none',
    flexDirection: "row",
    marginBottom: 36,
  },
  availabilityText: {
    fontFamily: "Cera Round Pro",
    fontSize: 14,
    lineHeight: 21,
  },
  greenCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: "#A7D676",
    marginRight: 10,
  },
  available: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 35,
  },
  redCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#EF473A",
  },
  unavailable: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  timeContainer: {
    width: 310,
    marginBottom: 35,
  },
  timeContainerDisabled: {
    opacity: 0.5,
  },
  timeTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "space-between",
    width: "100%",
    marginBottom: 1,
  },
  timeItem: {
    display: "flex",
    alignItems: "center",
    marginRight: 15,
  },
  timeText: {
    fontFamily: "Cera Round Pro Medium",
    fontSize: 18,
    lineHeight: 18,
    padding: 16,
    borderColor: "#EF473A",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 15,
    color: "#EF473A",
    overflow: "hidden",
  },
  tripActive: {
    backgroundColor: "#EF473A",
    color: "white",
  },
  timeTextActive: {
    backgroundColor: "#EF473A",
    color: "#FFFFFF",
    borderRadius: 25,
  },
  timeBottomText: {
    fontFamily: "Cera Round Pro Medium",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 19,
    color: "#EF473A",
    marginTop: 15,
  },
  resultTitle: {
    fontFamily: "Cera Round Pro Bold",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 5,
    color: "#303030",
  },
  resultDesc: {
    fontFamily: "Cera Round Pro",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  resultText: {
    fontFamily: "Cera Round Pro Light",
    color: "#888888",
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    marginBottom: 15,
  },
  resultText2: {
    fontFamily: "Cera Round Pro Light",
    color: "#888888",
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
  },
  lastTrip: {
    marginRight: 0,
  },
  tripOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tripOptionText: {
    marginLeft: 15,
    fontFamily: "Cera Round Pro",
    color: "#EF473A",
  },
  tripOptionsWrap: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "flex",
    width: 300,
    marginBottom: 20,
  },
});
