import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, department, transaction, date, time) {
  return { name, department, transaction, date, time };
}

const data = [
  createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
  createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
  createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
  createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
  createData("Ziad Ahmed", "zas", "Clock in", "01/01/2023", "14:02"),

  createData("Ziad Ahmed", "Development", "Clock in", "01/01/2023", "14:02"),
  createData("Ziad Ahmed", "zas", "Clock in", "01/01/2023", "14:02"),
];

const groupByDepartment = (data) => {
  return data.reduce((groups, row) => {
    const department = row.department;
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(row);
    return groups;
  }, {});
};

export default function LogGrid({ language }) {
  const groupedData = groupByDepartment(data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ width: "20%", padding: "12px 16px", color: "#707070" }}
            >
              {language === "en" ? "Name" : "الاسم"}
            </TableCell>
            <TableCell
              sx={{ width: "20%", padding: "12px 16px", color: "#707070" }}
              align="left"
            >
              {language === "en" ? "Department" : "القسم"}
            </TableCell>
            <TableCell
              sx={{ width: "20%", padding: "12px 16px", color: "#707070" }}
              align="left"
            >
              {language === "en" ? "Transaction" : "العملية"}
            </TableCell>
            <TableCell
              sx={{ width: "20%", padding: "12px 16px", color: "#707070" }}
              align="left"
            >
              {language === "en" ? "Date" : "التاريخ"}
            </TableCell>
            <TableCell
              sx={{ width: "20%", padding: "12px 16px", color: "#707070" }}
              align="left"
            >
              {language === "en" ? "Time" : "الوقت"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(groupedData).map(([department, rows]) => (
            <React.Fragment key={department}>
              {/* Department Header Row */}
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    padding: "8px 16px",
                    fontWeight: 400,
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  {department}
                </TableCell>
              </TableRow>

              {/* Rows for each department */}
              {rows.map((row) => (
                <TableRow
                  key={row.name}
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
                    sx={{
                      padding: "8px 16px",
                      lineHeight: 1,
                      fontSize: "12px",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      padding: "8px 16px",
                      lineHeight: 1,
                      fontSize: "12px",
                    }}
                  >
                    {row.department}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      padding: "8px 16px",
                      lineHeight: 1,
                      fontSize: "12px",
                    }}
                  >
                    {row.transaction}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      padding: "8px 16px",
                      lineHeight: 1,
                      fontSize: "12px",
                    }}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      padding: "8px 16px",
                      lineHeight: 1,
                      fontSize: "12px",
                    }}
                  >
                    {row.time}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
