import axios from "axios";

export function takeAction(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  return axios
    .post(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn?vCardNumber=${data.cardId}&LogDate=${data.date}&AttDateTime=${data.dateTime}&CheckInKind=${data.kind}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
