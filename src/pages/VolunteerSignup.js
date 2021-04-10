import React from 'react';
import { useHistory } from 'react-router-dom';

export default function VolunteerSignup() {
  const history = useHistory();

  function handleSubmit(event) {
    if (
      event.target.elements.age.value > 35 ||
      event.target.elements.bp.checked ||
      event.target.elements.heart.checked ||
      event.target.elements.diabetes.checked ||
      event.target.elements.kidney.checked ||
      event.target.elements.copd.checked ||
      event.target.elements.asthma.checked
    ) {
      alert(
        'Volunteer Registration Denied!\n ' +
          'Sorry you are not eligible to be a volunteer in the COVID pandemic situation'
      );
      history.push('/');
    } else {
      alert('Volunteer Registration Successful!\n ' + 'Welcome Aboard');
      history.push('/volunteer-dashboard');
    }
    event.preventDefault();
  }

  return (
    <>
      <div className="library-fontello">
        <i
          className="icon-left-open back"
          onClick={() => {
            history.push('/signup');
          }}
        ></i>
      </div>
      <div className="title">Volunteer Sign Up</div>
      <div className="body">
        <form onSubmit={handleSubmit}>
          <div>
            First Name:{' '}
            <input
              type="text"
              name="firstname"
              className="input"
              required={true}
            />
          </div>
          <div>
            Last Name:{' '}
            <input
              type="text"
              name="lastname"
              className="input"
              required={true}
            />
          </div>
          <div>
            Age:{' '}
            <input
              type="number"
              name="age"
              maxLength="3"
              min="0"
              className="input-age"
              required={true}
            />
            Sex:
            <select required={true}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <br />
          <div>
            <h2>Medical Conditions (tick all that apply)</h2>
          </div>
          <br />
          <fieldset>
            <div>
              <input
                type="checkbox"
                id="bp"
                name="bp"
                className="input-checkbox"
              />
              <label htmlFor="bp">High Blood Pressure</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="heart"
                name="heart"
                className="input-checkbox"
              />
              <label htmlFor="heart">Heart Conditions</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="diabetes"
                name="diabetes"
                className="input-checkbox"
              />
              <label htmlFor="diabetes">Diabetes</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="kidney"
                name="kidney"
                className="input-checkbox"
              />
              <label htmlFor="kidney">Chronic Kidney Disease</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="copd"
                name="copd"
                className="input-checkbox"
              />
              <label htmlFor="copd">COPD</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="asthma"
                name="asthma"
                className="input-checkbox"
              />
              <label htmlFor="asthma">Asthma</label>
            </div>
          </fieldset>
          <br />
          <div>
            <div>
              Username:{' '}
              <input
                type="text"
                name="username"
                className="input"
                required={true}
              />
            </div>
            <div>
              Phone number:{' '}
              <input
                type="tel"
                name="phonenumber"
                className="input"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                // placeholder="650-390-7919"
                required={true}
              />
            </div>
          </div>
          <br />
          <div align="center">
            <input
              type="submit"
              className="btn-primary btn"
              value="Sign Up"
              id="submit"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
}
