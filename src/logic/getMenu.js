import axios from "axios";

export async function getMenu() {
  const payload = new FormData();
  payload.append("action", "rtbMenuDataNew");
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
