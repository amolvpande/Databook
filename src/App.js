import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./styles.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export default function App() {
  const defaultStartDate = "2023-04-19";
  const defaultEndDate = "2023-04-19";
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchId, setSearchId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [tickets, setTickets] = useState([
    {
      id: 1,
      empID: 124235,
      branch: "Thane",
      date: "19/04/2023",
      type: "Full",
      amount: "5,47,890",
      empCode: "A123",
      bank: "CMV HDFC 1223562536",
      requestedBy: "Sharad Verma",
      status: "Pending",
    },
    {
      id: 2,
      branch: "Navi Mumbai",
      date: "19/04/2023",
      type: "Full",
      empID: 563233,
      empCode: "A3445",
      amount: "2,46,732",
      bank: "UYT SCB 632786433",
      requestedBy: "Pramod Mehta",
      status: "Approved",
    },
    {
      id: 3,
      empID: 213352,
      branch: "Mumbai",
      date: "19/04/2023",
      type: "Short",
      amount: "5,53,672",
      bank: "OIT HDFC 6732647333",
      requestedBy: "Vikas Singh",
      empCode: "A9765",
      status: "Rejected",
    },
    {
      id: 4,
      empID: 256243,
      branch: "Kurla",
      date: "19/04/2023",
      type: "Full",
      amount: "1,97,146",
      bank: "YTF SBI 4823768742",
      requestedBy: "Sharad Srivastava",
      empCode: "A6467",
      status: "Approved",
    },
    {
      id: 5,
      empID: 754833,
      branch: "Vile Parle",
      date: "19/04/2023",
      type: "Full",
      amount: "2,42,178",
      bank: "PHS SBI 839283333",
      requestedBy: "Vikas Mehra",
      empCode: "A0435",
      status: "Approved",
    },
    {
      id: 6,
      empID: 367324,
      branch: "Lower Parle",
      date: "19/04/2023",
      type: "Short",
      amount: "6,43,211",
      bank: "PDS HDFC 843959347",
      requestedBy: "Sharad Kapoor",
      empCode: "A1789",
      status: "Rejected",
    },
    {
      id: 7,
      empID: 754833,
      branch: "Andheri",
      date: "19/04/2023",
      type: "Full",
      amount: "8,43,789",
      bank: "GBG HDFC 523127722",
      requestedBy: "Pramod Mathur",
      empCode: "A0435",
      status: "Approved",
    },
    {
      id: 8,
      empID: 367324,
      branch: "Byculla",
      date: "19/04/2023",
      type: "Full",
      amount: "6,42,843",
      bank: "MGB SCB 253654373",
      requestedBy: "Vikas Sethi",
      empCode: "A1789",
      status: "Approved",
    },
  ]);

  const filteredTickets = tickets.filter((ticket) => {
    const ticketDate = new Date(
      ticket.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")
    );
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateFilter =
      (!start || ticketDate >= start) && (!end || ticketDate <= end);

    const branchFilter = !selectedBranch || ticket.branch === selectedBranch;

    const typeFilter = !selectedType || ticket.type === selectedType;

    const statusFilter = !selectedStatus || ticket.status === selectedStatus;

    const idFilter = !searchId || ticket.empID.toString().includes(searchId);

    return dateFilter && branchFilter && typeFilter && statusFilter && idFilter;
  });
  const handleDelete = (id) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== id);

    setTickets(updatedTickets);
  };

  const isDataFound = filteredTickets.length > 0;

  return (
    <div>
      <div className="top-Container">
        <div className="Container-top">
          <div className="left-Container">
            <div className="cal">
              <label>From</label>
              <input
                className="for-hw"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="cal">
              <label>To</label>
              <input
                className="for-hw"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="div-h">
              <label>Branch</label>
              <select
                className="for-hw"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="">All </option>
                {Array.from(
                  new Set(tickets.map((ticket) => ticket.branch))
                ).map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="div-h">
              <label>Type</label>
              <select
                className="for-hw"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All </option>
                {Array.from(new Set(tickets.map((ticket) => ticket.type))).map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="div-h">
              <label>Status</label>
              <select
                className="for-hw"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All </option>
                {Array.from(
                  new Set(tickets.map((ticket) => ticket.status))
                ).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="right-Container">
            <div className="search">
              <input
                className="input"
                placeholder="Search ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <TableContainer
        component={Paper}
        style={{ width: 1090, margin: "auto", paddingTop: 20 }}
      >
        {isDataFound ? (
          <Table>
            <TableHead className="tableHead">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>BRANCH</TableCell>
                <TableCell>TYPE</TableCell>
                <TableCell>
                  <TableRow>AMOUNT </TableRow>
                  <TableRow> (IN RUPEES)</TableRow>
                </TableCell>
                <TableCell>BANK</TableCell>
                <TableCell>
                  <TableRow>REQUESTED BY </TableRow>
                  <TableRow>(EMPLOYEE CODE)</TableRow>
                </TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell style={{ fontWeight: "bold" }}>
                    {ticket.empID}
                  </TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>{ticket.branch}</TableCell>
                  <TableCell>{ticket.type}</TableCell>
                  <TableCell>{ticket.amount}</TableCell>
                  <TableCell>{ticket.bank}</TableCell>
                  <TableCell>
                    <TableRow> {ticket.requestedBy} </TableRow>
                    <TableRow style={{ fontWeight: "bold" }}>
                      ({ticket.empCode}){" "}
                    </TableRow>
                  </TableCell>
                  <TableCell className="tic-cell">
                    {ticket.status}
                    <HighlightOffIcon
                      className="icon"
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(ticket.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <p style={{ fontSize: 30, color: "red" }}>
              No data found for the selected date range.
            </p>
          </div>
        )}
      </TableContainer>
      <footer style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
        <p>
          &copy; belongs to Amol Pande +919423240610 Email-amolvpande@gmail.com
        </p>
      </footer>
    </div>
  );
}
