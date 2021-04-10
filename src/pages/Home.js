import { useState, useEffect } from 'react';
import { Form, Col, Button, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function Home(props) {
  const history = useHistory();
  const from = new URLSearchParams(window.location.search).get('from');

  useEffect(() => {
    if (from === 'test') {
      setTimeout(() => {
        alert('Volunteers have been matched for your pending request');
        history.push('/new-request/volunteer-selection');
      }, 3000);
    }
  }, []);

  function onDemand(e) {
    e.preventDefault();
    history.push('/item-list');
  }
  function subscribe(e) {
    e.preventDefault();
    history.push('/subscription-item-list');
  }

  console.log(props.requests);

  return (
    <>
      <div
        class="logout"
        onClick={() => {
          history.push('/login');
        }}
      >
        Logout
      </div>
      {/* <div className="back">
        <div className="library-fontello">
          <i className="icon-torso"></i>
        </div>
        <a
          onClick={() => {
            history.push("/login");
          }}
        >
          Logout
        </a>
      </div> */}
      <div class="title">Home</div>
      <div class="body">
        <div className="library-fontello click-btn btn" onClick={onDemand}>
          <i className="icon-plus-circled sub"></i>{' '}
          <span class="sub">Create new on-demand request</span>
        </div>

        <div className="library-fontello click-btn btn" onClick={subscribe}>
          <i className="icon-plus-circled sub"></i>{' '}
          <span class="sub">Create new subscription request</span>
        </div>
        <h2> List of Requests </h2>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Items</th>
              <th>Volunteer</th>
            </tr>
          </thead>
          <tbody>
            {props.requests.map((request) => (
              <tr>
                <td>{request.date}</td>
                <td>{request.type}</td>

                <td>{request.itemList.map((item) => item.itemName).join(', ')}</td>
                <td>{request.volunteer}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
