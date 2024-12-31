import React, { useState, useMemo } from "react";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Table = ({ employees, handleEdit, handleDelete }) => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for sorting
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // State for multiple selection
  const [selectedIds, setSelectedIds] = useState([]);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Format salary
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  // State for search functionality
  const [searchText, setSearchText] = useState("");

  // State for role filter
  const [selectedRole, setSelectedRole] = useState("");

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  // Handle sorting
  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  // Handle role filter change
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    if (searchText) {
      filtered = filtered.filter((employee) =>
        Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(searchText)
        )
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((employee) =>
        employee.role.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    return filtered;
  }, [employees, searchText, selectedRole]);

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredEmployees;

    return [...filteredEmployees].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredEmployees, sortColumn, sortDirection]);

  // Handle pagination
  const paginatedData = useMemo(() => {
    return sortedData.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [sortedData, currentPage, rowsPerPage]);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((employee) => employee.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length > 0) {
      handleDelete(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="contain-table">
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={handleDeleteSelected}
            className="button"
            style={{
              backgroundColor: "#D92525",
              color: "#fff",
              border: "none",
              height: "35px",
              borderRadius: "5px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Delete Selected
          </button>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "250px",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label htmlFor="role-filter" style={{ marginRight: "10px" }}>
            Filter Role:
          </label>
          <select
            id="role-filter"
            value={selectedRole}
            onChange={handleRoleChange}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>

          <label htmlFor="sort-options" style={{ marginRight: "10px" }}>
            Sort By:
          </label>
          <select
            id="sort-options"
            onChange={(e) => handleSort(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">None</option>
            <option value="firstName">First Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>
        </div>
      </div>

      <table className="striped-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedIds.length === paginatedData.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((employee, index) => (
              <tr key={employee.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
                <td>{currentPage * rowsPerPage + index + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                    style={{
                      backgroundColor: "#0477BF",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleView(employee)}
                    className="button muted-button"
                    style={{
                      backgroundColor: "#038C4C",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    View
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                    style={{
                      backgroundColor: "#D92525",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 16px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>

      <TablePagination
        component="div"
        count={filteredEmployees.length}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(+e.target.value)}
      />

      {isModalOpen && selectedEmployee && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h2>User Details</h2>
            <div>
              <strong>First Name:</strong> {selectedEmployee.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {selectedEmployee.lastName}
            </div>
            <div>
              <strong>Email:</strong> {selectedEmployee.email}
            </div>
            <div>
              <strong>Role:</strong> {selectedEmployee.role}
            </div>
            <div>
              <strong>Salary:</strong>{" "}
              {formatter.format(selectedEmployee.salary)}
            </div>
            <div>
              <strong>Date:</strong> {selectedEmployee.date}
            </div>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#038C4C",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Table;
