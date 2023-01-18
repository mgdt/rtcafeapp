import axios from "axios";

export async function disableSert(
  additionalInfo,
  adult,
  bookingDate,
  cartItem,
  child,
  email,
  idTrip,
  name,
  onlyTicket,
  phone,
  surname,
  table,
  sertNumber
) {
  const payload = new FormData();
  const sertPayload = new FormData();

  sertPayload.append("action", "disable_sert");
  sertPayload.append("number", sertNumber);
  sertPayload.append("fio", `${surname} ${name}`);
  sertPayload.append("phone", phone);
  sertPayload.append("email", email);

  payload.append("action", "rtbProcessPayment");
  payload.append("is_mob_app", true);
  payload.append("mailchimp", false);
  payload.append(
    "additionalInfo",
    `${additionalInfo} *(*Использован сертификат №${sertNumber}*** (заказ из приложения)`
  );
  payload.append("adult", adult);
  payload.append("allTables", 0);
  payload.append("bookingDate", bookingDate);
  payload.append("cartItem", JSON.stringify(cartItem));
  payload.append("child", child);
  payload.append("email", email);
  payload.append("idBooking", 0);
  payload.append("idTrip", idTrip);
  payload.append("name", name);
  payload.append("online", 0);
  payload.append("onlyTicket", onlyTicket);
  payload.append("phone", phone);
  payload.append("surname", surname);
  payload.append("table", table);

  await axios({
    method: "post",
    url: "https://rtcafe.ru/sert-admin/actions.php",
    data: sertPayload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const response = await axios({
    method: "post",
    url: "https://rtcafe.ru/wp-admin/admin-ajax.php",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
