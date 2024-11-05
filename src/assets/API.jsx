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

export function login(data) {
  console.log("from login req", data.id);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/Login?vCardNumber=${data.id}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function checkIn(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };
  console.log(data);
  return axios
    .post(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn?vCardNumber=${data.id}&AttDateTime=${data.dateTime}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getDepartments() {
  return axios
    .get(`http://zasair-001-site8.atempurl.com/api/HrAttendance/Departments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEmployees(data) {
  console.log(data);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/Employee?DepId=${data.departmentId}&DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
