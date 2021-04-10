import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function Subscription(props) {
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState();
  const [frequency, setFrequency] = useState('');

  console.log(props);
  const { itemList } = props.location.state;
  const [deliveryDate, setDeliveryDate] = useState();
  const history = useHistory();

  function handleFindVolunteer(e) {
    e.preventDefault();

    console.log(props);
    props.setRequests([
      ...props.requests,
      {
        type: 'Subscription - ' + frequency,
        date: deliveryDate,
        itemList,
        volunteer: 'pending',
      },
    ]);
    console.log(props.requests);
    alert(
      'We are matching nearby available volunteers for you. We will notify you when we find one!'
    );
    history.push('/user-home?from=test');
  }

  return (
    <>
      <div class="library-fontello">
        <i
          class="icon-left-open back"
          onClick={() => {
            history.push('/subscription-item-list');
          }}
        ></i>
      </div>
      <div class="title">Subscription</div>
      <div class="body">
        <Form>
          <Form.Group>
            <Form.Label>Delivery Date</Form.Label>
            <Form.Control
              type="date"
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control
              type="time"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            ></Form.Control>
            <Form.Control
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
            <Form.Control
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            ></Form.Control>
            <Form.Control
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Delivery Frequency</Form.Label>
            <Form.Control
              as="select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option>Select One</option>
              <option>Weekly</option>
              <option>Bi-Weekly</option>
              <option>Monthly</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" onClick={handleFindVolunteer}>
            Find Volunteer
          </Button>
        </Form>
      </div>
    </>
  );
}
