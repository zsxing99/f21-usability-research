import React from 'react';
import { useHistory } from 'react-router-dom';
import { alertWithTracking } from "../tracking/wrapper/alert";

export default function Signup() {
  const history = useHistory();

  function handleSubmit(event) {
    if (event.target.elements.username.value === 'Mary') {
      alertWithTracking('Registration Successful: Welcome Mary');
      history.push('/user-home');
    } else {
      window.location.reload(true);
    }
    event.preventDefault();
  }

  return (
    <>
      <div className="title">BenevoleBuddy</div>
      <div className="body">
        <form onSubmit={handleSubmit} style={{ fontSize: '20px' }}>
          <br />
          <div>
            <h2>
              Register as{' '}
              <a
                className="a-class"
                onClick={() => {
                  history.push('/signup');
                }}
              >
                Senior Citizen
              </a>{' '}
              or{' '}
              <a
                className="a-class"
                onClick={() => {
                  history.push('/volunteer-signup');
                }}
              >
                Volunteer
              </a>
              ?
            </h2>
          </div>

          <br />
          <div>
            Username
            <input
              type="text"
              name="username"
              className="input"
              required={true}
            />
          </div>
          <div>
            Email
            <input
              type="email"
              name="email"
              className="input-email"
              required={true}
              style={{marginLeft: '52px'}}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="password"
              className="input-password"
              required
              minLength="4"
            />
          </div>
          <br />
          <div align="center">
            <input
              type="submit"
              className="btn-primary btn"
              value="Register"
              id="submit"
            ></input>
          </div>
        </form>
        <br />
        <div align="center">
          <a
            className="a-class"
            onClick={() => {
              history.push('/login');
            }}
          >
            Already Registered? Login
          </a>
        </div>
      </div>
    </>
  );
}
