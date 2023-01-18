import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as Font from "expo-font";
import { useState, useEffect, useRef } from "react";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { DateScreen } from "./src/screens/DateScreen";
import { TableScreen } from "./src/screens/TableScreen";
import { MenuScreen } from "./src/screens/MenuScreen";
import { BookingScreen } from "./src/screens/BookingScreen";
import { SuccessScreen } from "./src/screens/SuccessScreen";
import { PaymentScreen } from "./src/screens/PaymentScreen";
import { getMenu } from "./src/logic/getMenu";
import { clearState } from "./src/helpers/clearState";

async function loadData() {
  await Font.loadAsync({
    "Cera Round Pro": require("./assets/fonts/CeraRoundProRegular.ttf"),
    "Cera Round Pro Bold": require("./assets/fonts/CeraRoundProBold.ttf"),
    "Cera Round Pro Black": require("./assets/fonts/CeraRoundProBlack.ttf"),
    "Cera Round Pro Light": require("./assets/fonts/CeraRoundProLight.ttf"),
    "Cera Round Pro Medium": require("./assets/fonts/CeraRoundProMedium.ttf"),
    "Cera Round Pro Thin": require("./assets/fonts/CeraRoundProThin.ttf"),
  });
}

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("date");

  // UI STATE
  const [calendarDates, setCalendarDates] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [trips, setTrips] = useState([
    { id: 1, start: "15:00", properties: [] },
    { id: 2, start: "17:00", properties: [] },
    { id: 3, start: "19:00", properties: [] },
  ]);
  const [tripsDisabled, setTripsDisabled] = useState(true);
  const [currentTrip, setCurrentTrip] = useState({
    properties: [],
    trip: "19:00-20:30",
  });
  const [tablesSizes, setTablesSizes] = useState([
    {
      number: "",
      min: 3,
      max: 3,
    },
  ]);
  const [menuCats, setMenuCats] = useState([
    {
      id_category: "",
      title: "",
    },
  ]);
  const [menuGoods, setMenuGoods] = useState([
    {
      category: "",
      description: "",
      id_goods: "",
      price: "",
      title: "",
      photo: "",
    },
  ]);
  const [initialDate, setInitialDate] = useState("");

  // LOGIC STATE
  const [idTrip, setIdTrip] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [tripPrice, setTripPrice] = useState(0);
  const [adultsCount, setAdultsCount] = useState(0);
  const [childsCount, setChildsCount] = useState(0);
  const [addedGoods, setAddedGoods] = useState({});
  const [ticketPrice, setTicketPrice] = useState(0);
  const [menuPrice, setMenuPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [onlyTicket, setOnlyTicket] = useState(false);
  const [comment, setComment] = useState("");
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [fio, setFio] = useState("Тестов Тест");
  // const [phone, setPhone] = useState("79024672123");
  // const [email, setEmail] = useState("test@test.tu");
  const [paymentLink, setPaymentLink] = useState("");

  function clearApp() {
    clearState({
      setCalendarDates,
      setSelectedDay,
      setTrips,
      setTripsDisabled,
      setCurrentTrip,
      setTablesSizes,
      setMenuCats,
      setMenuGoods,
      setIdTrip,
      setBookingDate,
      setTableNumber,
      setTripPrice,
      setAdultsCount,
      setChildsCount,
      setAddedGoods,
      setTicketPrice,
      setMenuPrice,
      setTotalPrice,
      setOnlyTicket,
      setComment,
      setFio,
      setPhone,
      setEmail,
      setPaymentLink,
      setInitialDate,
    });
  }

  useEffect(() => {
    setTicketPrice(+tripPrice * +adultsCount);
  }, [tripPrice, adultsCount]);

  useEffect(() => {
    if (onlyTicket) {
      setTotalPrice(+ticketPrice);
    } else {
      setTotalPrice(+ticketPrice + +menuPrice);
    }
  }, [ticketPrice, menuPrice, onlyTicket]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu();
      const cats = data.categories.filter((category) => category.parent == 29);
      setMenuCats(cats);
      setMenuGoods(data.goods);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (tableNumber == 1) {
      setAdultsCount(3);
      setChildsCount(0);
    }
    if (tableNumber == 2) {
      setAdultsCount(3);
      setChildsCount(0);
    }
    if (tableNumber == 3) {
      setAdultsCount(3);
      setChildsCount(0);
    }
    if (tableNumber == 4) {
      setAdultsCount(4);
      setChildsCount(0);
    }
  }, [tableNumber]);

  function setScreen(screen) {
    setCurrentScreen(screen);
  }

  loadData().then(() => {
    setTimeout(() => {
      setAppIsLoaded(true);
    }, 2000);
  });

  let content;

  switch (currentScreen) {
    case "date":
      content = (
        <DateScreen
          setScreen={setScreen}
          setBookingDate={setBookingDate}
          bookingDate={bookingDate}
          setCalendarDates={setCalendarDates}
          calendarDates={calendarDates}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          setTrips={setTrips}
          trips={trips}
          tripsDisabled={tripsDisabled}
          setTripsDisabled={setTripsDisabled}
          setIdTrip={setIdTrip}
          idTrip={idTrip}
          currentTrip={currentTrip}
          setCurrentTrip={setCurrentTrip}
          setTableNumber={setTableNumber}
          setTripPrice={setTripPrice}
          initialDate={initialDate}
          setInitialDate={setInitialDate}
        ></DateScreen>
      );
      break;
    case "table":
      content = (
        <TableScreen
          setScreen={setScreen}
          idTrip={idTrip}
          bookingDate={bookingDate}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          tripPrice={tripPrice}
          currentTrip={currentTrip}
          adultsCount={adultsCount}
          setAdultsCount={setAdultsCount}
          childsCount={childsCount}
          setChildsCount={setChildsCount}
          tablesSizes={tablesSizes}
          setTablesSizes={setTablesSizes}
          ticketPrice={ticketPrice}
        ></TableScreen>
      );
      break;
    case "menu":
      content = (
        <MenuScreen
          setScreen={setScreen}
          menuCats={menuCats}
          menuGoods={menuGoods}
          addedGoods={addedGoods}
          setAddedGoods={setAddedGoods}
          menuPrice={menuPrice}
          setMenuPrice={setMenuPrice}
        ></MenuScreen>
      );
      break;
    case "booking":
      content = (
        <BookingScreen
          setScreen={setScreen}
          bookingDate={bookingDate}
          tableNumber={tableNumber}
          currentTrip={currentTrip}
          adultsCount={adultsCount}
          childsCount={childsCount}
          ticketPrice={ticketPrice}
          addedGoods={addedGoods}
          setAddedGoods={setAddedGoods}
          menuPrice={menuPrice}
          setMenuPrice={setMenuPrice}
          onlyTicket={onlyTicket}
          setOnlyTicket={setOnlyTicket}
          totalPrice={totalPrice}
          clearApp={clearApp}
          comment={comment}
          setComment={setComment}
          fio={fio}
          setFio={setFio}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          setPaymentLink={setPaymentLink}
          paymentLink={paymentLink}
        ></BookingScreen>
      );
      break;
    case "success":
      content = (
        <SuccessScreen
          setScreen={setScreen}
          clearApp={clearApp}
        ></SuccessScreen>
      );
      break;
    case "payment":
      content = (
        <PaymentScreen
          paymentLink={paymentLink}
          setScreen={setScreen}
        ></PaymentScreen>
      );
      break;
  }

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
    });
  }, [currentScreen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 1000,
    });
  }, [tableNumber]);

  if (appIsLoaded) {
    return (
      <>
        <StatusBar
        // backgroundColor={currentScreen == "success" ? "#EF473A" : "#F9F9F9"}
        ></StatusBar>
        <SafeAreaView
          style={currentScreen == "success" ? styles.redBar : styles.grayBar}
        >
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
          >
            <View style={styles.container}>{content}</View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  } else {
    return <LoadingScreen></LoadingScreen>;
  }
}

const styles = StyleSheet.create({
  redBar: {
    backgroundColor: "#EF473A",
  },
  grayBar: {
    backgroundColor: "#F9F9F9",
  },
  scroll: {
    display: "flex",
    backgroundColor: "#F9F9F9",
    minHeight: "100%",
  },
  container: {
    height: "100%",
  },
});
