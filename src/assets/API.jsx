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
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };
  console.log("check in data", data);
  console.log(
    "http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn"
  );
  return axios
    .post(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckIn`,
      data
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export function checkOut(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };
  console.log("Chick out data", data);
  return axios
    .post(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/AttendanceCheckOut`,
      { ...data },
      requestOptions
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
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

export function getInEmployees(data) {
  console.log(data);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/EmployeeIn?DepId=${data.departmentId}&DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getOutEmployees(data) {
  console.log(data);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/EmployeeOut?DepId=${data.departmentId}&DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEmployeesInList(data) {
  console.log(data);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/InList?DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getEmployeesOutList(data) {
  console.log(data);
  return axios
    .get(
      `http://zasair-001-site8.atempurl.com/api/HrAttendance/OutList?DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
