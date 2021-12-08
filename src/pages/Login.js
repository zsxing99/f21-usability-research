import React from 'react';
import { useHistory } from 'react-router-dom';
import { disableVolunteerFlag } from './Availablity-HealthStatus';
import { alertWithTracking } from "../tracking/wrapper/alert";

export default function Login() {
  const history = useHistory();

  function handleSubmit(event) {
    if (event.target.elements.username.value === 'Mary') {
      alertWithTracking('Login Successful: Welcome Mary!');
      history.push('/user-home');
    } else if (event.target.elements.username.value === 'Caleb') {
      alertWithTracking('Login Successful: Welcome Caleb!');
      history.push('/volunteer-dashboard');
    } else if (
      event.target.elements.username.value === 'John' &&
      event.target.elements.usertyp.value === 'Volunteer' &&
      disableVolunteerFlag
    ) {
      alertWithTracking(
        'Covid Symptoms were logged by you in last 14 days. Volunteer Account disabled. Take Care :)'
      );
      window.location.reload(true);
    } else {
      window.location.reload(true);
    }
    event.preventDefault();
  }

  return (
    <>
      <div className="title">BenevoleBuddy</div>
      <div className="body">
        <form
          onSubmit={handleSubmit}
          style={{ fontSize: '20px', marginLeft: '13px' }}
        >
          <br />
          <br />
          <div>
            <div>
              Username:
              <input
                type="text"
                name="username"
                className="input"
                required
                minLength="4"
              />
            </div>
            <div>
              Password:
              <input
                type="password"
                name="password"
                className="input-password"
                placeholder=" "
                required
                minLength="4"
              />
            </div>
          </div>
          <br />
          <div align="center">
            <input
              type="submit"
              className="btn-primary btn"
              value="Login"
              id="submit"
            ></input>
          </div>
        </form>
        <br />
        <div align="center">
          <a
            className="a-class"
            onClick={() => {
              history.push('/signup');
            }}
          >
            New User? Signup
          </a>
        </div>
      </div>
    </>
  );
}
