import axios from "axios";

export async function payOrder(
  additionalInfo,
  adult,
  bookingDate,
  cartItem,
  child,
  email,
  fullPrice,
  idTrip,
  name,
  onlyTicket,
  phone,
  surname,
  table
) {
  const payload = new FormData();

  payload.append("action", "pay_it_mob");
  payload.append("mailchimp", false);
  payload.append("additionalInfo", `${additionalInfo} (заказ из приложения)`);
  payload.append("adult", adult);
  payload.append("bookingDate", bookingDate);
  payload.append("cartItem", JSON.stringify(cartItem));
  payload.append("child", child);
  payload.append("email", email);
  payload.append("fullPrice", fullPrice);
  payload.append("idTrip", idTrip);
  payload.append("name", name);
  payload.append("onlyTicket", onlyTicket);
  payload.append("phone", phone);
  payload.append("surname", surname);
  payload.append("table", table);

  await axios({
    method: "post",
    url: "https://rtcafe.ru/apptest.php",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const response = await axios({
    method: "post",
    url: "https://rtcafe.ru/sberpay.php",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
