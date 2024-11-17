import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoIosCloseCircle } from "react-icons/io";
import { useEffect } from "react";
import { useState } from "react";

function createData(name, department, transaction, date, time) {
  return { name, department, transaction, date, time };
}

// const data = [
//   createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
//   createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
//   createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
//   createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
//   createData("Ziad Ahmed", "zas", "Clock in", "01/01/2023", "14:02"),

//   createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
//   createData("Ziad Ahmed", "zas", "Clock in", "01/01/2023", "14:02"),
// ];

const groupByDepartment = (data) => {
  return data.reduce((groups, row) => {
    const department = row.deparmentName;
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(row);
    return groups;
  }, {});
};

// const groupedData = data.reduce((acc, employee) => {
//   const department = employee.deparmentName;
//   if (!acc[department]) acc[department] = [];
//   acc[department].push(employee);
//   return acc;
// }, {});
export default function LogGrid({ language, data, title, onClose }) {
  const [groupedData, setGroupedData] = useState([]);
  useEffect(() => {
    const grouped = data && groupByDepartment(data);
    setGroupedData(grouped);
  }, [data]);
  console.log("old", groupedData);
  return (
    //<div className="dialog-overlay">
    // <div className="dialog" style={{ height: "60%" }}>
    //   <div className="dialog-header" style={{ marginBottom: "10px" }}>
    //     <h4>{title}</h4>
    //     <IoIosCloseCircle
    //       size={30}
    //       className="close-button"
    //       onClick={onClose}
    //     />
    //   </div>
    <TableContainer sx={{ width: "100%", height: "100%" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: "25%", padding: "12px 16px", color: "#707070" }}
              align={language === "en" ? "left" : "right"}
            >
              {language === "en" ? "Name" : "الاسم"}
            </TableCell>
            <TableCell
              sx={{ width: "25%", padding: "12px 16px", color: "#707070" }}
              align={language === "en" ? "left" : "right"}
            >
              {language === "en" ? "Department" : "القسم"}
            </TableCell>
            <TableCell
              sx={{ width: "25%", padding: "12px 16px", color: "#707070" }}
              align={language === "en" ? "left" : "right"}
            >
              {language === "en" ? "Date" : "التاريخ"}
            </TableCell>
            <TableCell
              sx={{ width: "25%", padding: "12px 16px", color: "#707070" }}
              align={language === "en" ? "left" : "right"}
            >
              {language === "en" ? "Time" : "الوقت"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData ? (
            Object.entries(groupedData).map(([department, employees]) => (
              <React.Fragment key={department}>
                {/* Department Header Row */}
                <TableRow>
                  <TableCell
                    colSpan={4}
                    sx={{
                      padding: "8px 16px",
                      fontWeight: 400,
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    {department}
                  </TableCell>
                </TableRow>

                {/* Rows for each employee in the department */}
                {employees.map((employee) => (
                  <TableRow
                    key={employee.personalId}
                    sx={{
                      height: 40,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align={language === "en" ? "left" : "right"}
                      sx={{
                        padding: "8px 16px",
                        lineHeight: 1,
                        fontSize: "12px",
                      }}
                    >
                      {employee.personalName}
                    </TableCell>
                    <TableCell
                      align={language === "en" ? "left" : "right"}
                      sx={{
                        padding: "8px 16px",
                        lineHeight: 1,
                        fontSize: "12px",
                      }}
                    >
                      {employee.deparmentName}
                    </TableCell>
                    <TableCell
                      align={language === "en" ? "left" : "right"}
                      sx={{
                        padding: "8px 16px",
                        lineHeight: 1,
                        fontSize: "12px",
                      }}
                    >
                      {new Date(employee.fromTime).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell
                      align={language === "en" ? "left" : "right"}
                      sx={{
                        padding: "8px 16px",
                        lineHeight: 1,
                        fontSize: "12px",
                      }}
                    >
                      {new Date(employee.fromTime).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))
          ) : (
            <TableRow style={{ width: "100%" }}>
              <TableCell
                style={{ textAlign: "center", width: "100%" }}
                colSpan={12}
              >
                {language === "en"
                  ? "No data available yet!"
                  : "لا يوجد بيانات"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    // </div>
    //</div>
  );
}
