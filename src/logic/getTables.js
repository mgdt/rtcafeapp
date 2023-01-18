import axios from "axios";

export async function getTables(idTrip, bookingDate) {
  const payload = new FormData();
  payload.append("action", "rtbGetTripInfo");
  payload.append("bookingDate", bookingDate);
  payload.append("idTrip", idTrip);
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
