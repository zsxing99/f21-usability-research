import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function NewRequestForm(props) {
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
        type: 'On demand',
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
            history.push('/item-list');
          }}
        ></i>
      </div>
      <div class="title">New Request</div>
      <div className="body">
        <Form>
          <Form.Group>
            <Form.Label>Essential Types</Form.Label>
            <div>
              <Form.Check inline label="Medicines" type="checkbox" />
              <Form.Check inline label="Groceries" type="checkbox" />
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Store Preference</Form.Label>
            <Form.Check
              label="Walmart"
              type="radio"
              name="store-pref"
              id="store-pref-1"
            />
            <Form.Check
              label="Costco"
              type="radio"
              name="store-pref"
              id="store-pref-2"
            />
            <Form.Check
              label="Whole Foods Market"
              type="radio"
              name="store-pref"
              id="store-pref-3"
            />
            <Form.Check
              label="Safeway"
              type="radio"
              name="store-pref"
              id="store-pref-4"
            />
            <Form.Check
              label="No preference"
              type="radio"
              name="store-pref"
              id="store-pref-walmart"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delivery Date</Form.Label>
            <Form.Control
              type="date"
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control type="time" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="Street" type="text" />
            <Form.Row className="mt-1">
              <Col xs="5">
                <Form.Control placeholder="City" type="text" />
              </Col>
              <Col xs="4">
                <Form.Control placeholder="State" type="text" />
              </Col>
              <Col xs="3">
                <Form.Control placeholder="Zip" type="text" />
              </Col>
            </Form.Row>
          </Form.Group>
          <Button
            type="submit"
            onClick={handleFindVolunteer}
            style={{ float: 'right' }}
          >
            Find Volunteer
          </Button>
        </Form>
      </div>
    </>
  );
}
