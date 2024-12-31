import React, { useState } from "react";

import { handleDownloadCSV } from "./handleDownloadCSV";
import { employeesData } from "../../data/index";



import Logout from "../Logout";

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  // State for search, filter, sorting, and pagination
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");


  // Filter and sort the data based on the user's input
  const filteredData = employeesData
    .filter((item) =>
      `${item.firstName} ${item.lastName} ${item.email}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    )
    .filter((item) => (filterRole ? item.role === filterRole : true))
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const aVal = a[sortColumn].toLowerCase();
      const bVal = b[sortColumn].toLowerCase();
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });

  return (
    <header>
      <h1>User Management System</h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <button onClick={() => setIsAdding(true)}>Add User</button>

        <button
          style={{
            marginTop: "0px",
            marginBottom: "18px",
            float: "right",
          }}
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>

        <Logout setIsAuthenticated={setIsAuthenticated} />


      </div>
    </header>
  );
};

export default Header;
