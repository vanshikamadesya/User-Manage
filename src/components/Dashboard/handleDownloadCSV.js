import { employeesData } from '../../data/index'; // Adjust the path as needed

export const handleDownloadCSV = () => {
  // Define headers for the CSV file
  const headers = Object.keys(employeesData[0]).join(",") + "\n";

  // Create rows for each employee
  const rows = employeesData.map(employee =>
    Object.values(employee).join(",")
  ).join("\n");

  // Combine headers and rows into the CSV content
  const csvContent = headers + rows;

  // Create a Blob from the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link to download the file
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", "employees-data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
