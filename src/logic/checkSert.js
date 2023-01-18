import axios from "axios";

export async function checkSert(sertNumber) {
  const payload = new FormData();

  payload.append("action", "get_by_number");
  payload.append("number", sertNumber);

  const response = await axios({
    method: "post",
    url: "https://rtcafe.ru/sert-admin/actions.php",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
