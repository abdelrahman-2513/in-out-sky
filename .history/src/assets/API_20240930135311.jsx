export function takeAction(data) {
  return fetch(
    `http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn?vCardNumber=${data.cardId}&LogDate=${data.date}&AttDateTime=${data.dateTime}&CheckInKind=${data.kind}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        withCredentials: true,
      },
    }
  );
}
