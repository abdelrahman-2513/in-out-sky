export function takeAction(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  return fetch(
    "http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn?vCardNumber=61&LogDate=29-9-2024&AttDateTime=29-9-2024%2013%3A00&CheckInKind=I",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
}
