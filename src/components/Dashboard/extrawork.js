import React, { useState, useMemo } from "react";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const Table = ({ employees, handleEdit, handleDelete }) => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for multiple selection
  const [selectedIds, setSelectedIds] = useState([]);

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  

  // Format salary
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: null,
  });

  // Calculate filtered data based on pagination
  const filteredData = useMemo(() => {
    return employees.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [employees, currentPage, rowsPerPage]);

  // Handle opening the modal
  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Date</th>
            <th colSpan={3} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((employee, index) => (
              <tr key={employee.id}>
                <td>{currentPage * rowsPerPage + index + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{formatter.format(employee.salary)}</td>
                <td>{employee.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                    style={{
                      backgroundColor: "#0477BF", /* Green background for the button */
                      color: "#fff", /* White text for contrast */
                      border: "none", /* Removes the default border */
                      borderRadius: "5px", /* Adds rounded corners */
                      padding: "8px 16px", /* Adds padding for better spacing */
                      cursor: "pointer", /* Changes cursor to pointer on hover */
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", /* Adds a subtle shadow */
                      fontSize: "14px", /* Sets a comfortable font size */
                      transition: "background-color 0.3s ease", /* Smooth hover effect */
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
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                      fontSize: "14px",
                      transition: "background-color 0.3s ease",
                      // marginLeft: "16px",
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
                      backgroundColor: "#D92525", /* Green background for the button */
                      color: "#fff", /* White text for contrast */
                      border: "none", /* Removes the default border */
                      borderRadius: "5px", /* Adds rounded corners */
                      padding: "8px 16px", /* Adds padding for better spacing */
                      cursor: "pointer", /* Changes cursor to pointer on hover */
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", /* Adds a subtle shadow */
                      fontSize: "14px", /* Sets a comfortable font size */
                      transition: "background-color 0.3s ease", /* Smooth hover effect */
                    }}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={employees.length}
        page={currentPage}
        onPageChange={(e, newPage) => setCurrentPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />

      {/* Modal for Viewing Employee */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedEmployee ? (
            <div>
              <h2>Employee Details</h2>
              <p>
                <strong>First Name:</strong> {selectedEmployee.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedEmployee.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Salary:</strong> {formatter.format(
                  selectedEmployee.salary
                )}
              </p>
              <p>
                <strong>Date:</strong> {selectedEmployee.date}
              </p>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#038C4C",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "14px",
                  marginTop: "16px",
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <p>No employee selected</p>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
