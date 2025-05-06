import axios from "axios";

export function takeAction(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  return axios
    .post(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/AttendanceCheckIn?vCardNumber=${data.cardId}&LogDate=${data.date}&AttDateTime=${data.dateTime}&CheckInKind=${data.kind}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function login(data) {
  console.log(
    "from login req",
    `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/Login?vCardNumber=${data.id}`
  );
  return axios
    .get(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/Login?vCardNumber=${data.id}`
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

  return axios
    .post(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/AttendanceCheckIn`,
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
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/AttendanceCheckOut`,
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
    .get(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/Departments`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getInEmployees(data) {
  console.log("from the in api", data);
  return axios
    .get(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/EmployeeIn?DepId=${data.departmentId}&DateChick=${data.date}`
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
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/EmployeeOut?DepId=${data.departmentId}&DateChick=${data.date}`
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getEmployeesInList(data) {
  return axios
    .get(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/InList?DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getEmployeesOutList(data) {
  return axios
    .get(
      `https://apiskyculinaire.zarkani-group.com/api/HrAttendance/OutList?DateChick=${data.date}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getJobsList() {
  return axios
    .get(`https://apiskyculinaire.zarkani-group.com/api/HR/Coding/HrLkpJops`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
