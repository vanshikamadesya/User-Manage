// Array of roles that we want to distribute equally
const roles = ['Administrator', 'Employee', 'User', 'Manager'];

// Function to generate the role list and assign it to employees
const generateRoles = () => {
  const shuffledRoles = [...roles];  // Create a copy of the roles array
  const totalEmployees = 10;         // Define how many employees you want
  const employeesRoles = [];

  // We want to cycle through the roles to distribute them equally
  for (let i = 0; i < totalEmployees; i++) {
    const roleIndex = i % roles.length; // Cycle through roles
    employeesRoles.push(roles[roleIndex]); // Assign the role
  }

  // Shuffle the roles to randomize their assignment
  for (let i = employeesRoles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [employeesRoles[i], employeesRoles[j]] = [employeesRoles[j], employeesRoles[i]]; // Swap elements
  }

  return employeesRoles;
};

// List of employee data with shuffled roles
const employeesData = [
  {
    id: 1,
    firstName: 'Susan',
    lastName: 'Jordon',
    email: 'susan@example.com',
    role: generateRoles()[0],  // Randomized role from shuffled list
    salary: '95000',
    date: '2022-04-11',
  },
  {
    id: 2,
    firstName: 'Adrienne',
    lastName: 'Doak',
    email: 'adrienne@example.com',
    role: generateRoles()[1],
    salary: '80000',
    date: '2024-04-17',
  },
  {
    id: 3,
    firstName: 'Rolf',
    lastName: 'Hegdal',
    email: 'rolf@example.com',
    role: generateRoles()[2],
    salary: '79000',
    date: '2020-05-01',
  },
  {
    id: 4,
    firstName: 'Kent',
    lastName: 'Rosner',
    email: 'kent@example.com',
    role: generateRoles()[3],
    salary: '56000',
    date: '2019-05-03',
  },
  {
    id: 5,
    firstName: 'Arsenio',
    lastName: 'Grant',
    email: 'arsenio@example.com',
    role: generateRoles()[0],
    salary: '65000',
    date: '2018-06-13',
  },
  {
    id: 6,
    firstName: 'Laurena',
    lastName: 'Lurie',
    email: 'laurena@example.com',
    role: generateRoles()[1],
    salary: '120000',
    date: '2017-07-30',
  },
  {
    id: 7,
    firstName: 'George',
    lastName: 'Tallman',
    email: 'george@example.com',
    role: generateRoles()[2],
    salary: '90000',
    date: '2020-08-15',
  },
  {
    id: 8,
    firstName: 'Jesica',
    lastName: 'Watlington',
    email: 'jesica@example.com',
    role: generateRoles()[3],
    salary: '60000',
    date: '2021-10-10',
  },
  {
    id: 9,
    firstName: 'Matthew',
    lastName: 'Warren',
    email: 'matthew@example.com',
    role: generateRoles()[0],
    salary: '71000',
    date: '2022-10-15',
  },
  {
    id: 10,
    firstName: 'Lyndsey',
    lastName: 'Follette',
    email: 'lyndsey@example.com',
    role: generateRoles()[1],
    salary: '110000',
    date: '2020-01-15',
  },
];

export { employeesData };