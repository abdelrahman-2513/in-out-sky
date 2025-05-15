import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export function takeAction(data) {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  return axios
    .post(
      `${baseURL}/api/HrAttendance/AttendanceCheckIn?vCardNumber=${data.cardId}&LogDate=${data.date}&AttDateTime=${data.dateTime}&CheckInKind=${data.kind}`
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
    `${baseURL}/api/HrAttendance/Login?vCardNumber=${data.id}`
  );
  return axios
    .get(`${baseURL}/api/HrAttendance/Login?vCardNumber=${data.id}`)
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
    .post(`${baseURL}/api/HrAttendance/AttendanceCheckIn`, data)
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
      `${baseURL}/api/HrAttendance/AttendanceCheckOut`,
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
  const today = new Date().toISOString().split("T")[0];
  return axios
    .get(`${baseURL}/api/HrAttendance/Departments?Dateselect=${today}`)
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
      `${baseURL}/api/HrAttendance/EmployeeIn?DepId=${data.departmentId}&DateChick=${data.date}`
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
      `${baseURL}/api/HrAttendance/EmployeeOut?DepId=${data.departmentId}&DateChick=${data.date}`
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
    .get(`${baseURL}/api/HrAttendance/InList?DateChick=${data.date}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getEmployeesOutList(data) {
  return axios
    .get(`${baseURL}/api/HrAttendance/OutList?DateChick=${data.date}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function getJobsList() {
  return axios
    .get(`${baseURL}/api/HR/Coding/HrLkpJops`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function checkManager(nfc) {
  return axios
    .get(`${baseURL}/api/HrAttendance/CheckAttManager?AttCode=${nfc}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
export function addingOverTimeShift(empNFC, managerNFC, time) {
  return axios
    .post(
      `${baseURL}/api/HrAttendance/AttendanceOverTimeShift?PersAttCode=${empNFC}&MangerAttCode=${managerNFC}&CurTime=${time}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
