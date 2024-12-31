import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'admin@gmail.com';
  const adminPassword = '1234';

  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('1234');

  // Add a class to the body for the login page
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLogin = e => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <h5>Enter your username and password</h5>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          style={{ marginTop: '12px', alignItems: 'center', justifyContent: 'center' }}
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Login;
