import { formatDate } from "../helpers/formatDate";
import axios from "axios";

export async function getDates() {
  const payload = new FormData();
  payload.append("action", "rtbStatusDates");
  const response = await axios({
    method: "post",
    url: "https://rtcafe.ru/wp-admin/admin-ajax.php",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const formatedData = {};
  response.data.forEach((item) => {
    if (item.status == "full") {
      formatedData[formatDate(item.date)] = {
        disabled: true,
        disableTouchEvent: true,
        customStyles: {
          container: {
            backgroundColor: "#EF473A",
            borderColor: "#EF473A",
            borderStyle: "solid",
            borderWidth: 2,
          },
          text: {
            color: "white",
          },
        },
      };
    } else {
      formatedData[formatDate(item.date)] = {
        unixDate: item.date,
        customStyles: {
          container: {
            backgroundColor: "transparent",
            borderColor: "#A7D676",
            borderStyle: "solid",
            borderWidth: 2,
          },
          text: {
            color: "#313030",
          },
        },
      };
    }
  });

  return formatedData;
}
