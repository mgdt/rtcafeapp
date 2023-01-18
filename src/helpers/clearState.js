export function clearState(setters) {
  setters.setCalendarDates({});
  setters.setSelectedDay("");
  setters.setTrips([
    { id: 1, start: "15:00", properties: [] },
    { id: 2, start: "17:00", properties: [] },
    { id: 3, start: "19:00", properties: [] },
  ]);
  setters.setTripsDisabled(true);
  setters.setCurrentTrip({
    properties: [],
    trip: "19:00-20:30",
  });
  setters.setTablesSizes([
    {
      number: "",
      min: 4,
      max: 4,
    },
  ]);
  setters.setIdTrip("");
  setters.setBookingDate("");
  setters.setTableNumber("");
  setters.setTripPrice(0);
  setters.setAdultsCount(0);
  setters.setChildsCount(0);
  setters.setAddedGoods({});
  setters.setTicketPrice(0);
  setters.setMenuPrice(0);
  setters.setTotalPrice(0);
  setters.setOnlyTicket(false);
  setters.setComment("");
  setters.setFio("");
  setters.setPhone("");
  setters.setEmail("");
  setters.setPaymentLink("");
  setters.setInitialDate("");
}
