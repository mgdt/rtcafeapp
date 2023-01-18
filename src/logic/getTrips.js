import axios from 'axios';

export async function getTrips(unixDate) {
  const payload = new FormData();
  payload.append('action', 'rtbGetTripsNew');
  payload.append('bookingDate', unixDate);
  const response = await axios({
    method: 'post',
    url: 'https://rtcafe.ru/wp-admin/admin-ajax.php',
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  response.data.data.forEach(item => {
    item.properties = JSON.parse(item.properties);
  });
  return response.data.data;
}